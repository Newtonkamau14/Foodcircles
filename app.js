const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const shopController = require('./routes/shopController');
const reviewsController = require('./routes/reviewsController')
const blogController = require('./routes/blogController');
const cateringController = require('./routes/cateringController');
const contactController = require('./routes/contactController');
const restaurantsController = require('./routes/restaurantsController');
const authController = require('./routes/authController')
const PORT = process.env.PORT || 3000;
 


mongoose.connect("mongodb://localhost:27017/Foodcircles",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err) => {
    if(!err){
        console.log('MongoDB Connection Succeeded');
    }
    else {
        console.log('Error in DB connection' + err);
    }
});

//Middleware
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout','layouts/layout')

app.use(bodyParser.urlencoded({
    extended: false 
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/Foodcircles',collectionName: 'sessions'}),
    cookie: { 
        maxAge: 1000 * 60 * 60 *  24
    }
}));
app.use(passport.initialize())
app.use(session())

//Routes
app.use('/shop', shopController);
app.use('/reviews',reviewsController);
app.use('/blog',blogController);
app.use('/catering',cateringController);
app.use('/contact',contactController);
app.use('/restaurants',restaurantsController);
app.use('/auth',authController)



app.get('/',(req,res) => {
    res.render('pages/home',{
        title: "Home"
    });
})


app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`);
});