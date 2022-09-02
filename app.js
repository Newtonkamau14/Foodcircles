const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const axios = require('axios')
const mealController = require('./routes/mealController');
const reviewsController = require('./routes/reviewsController')
const articleController = require('./routes/articleController');
const cateringController = require('./routes/cateringController');
const contactController = require('./routes/contactController');
const restaurantsController = require('./routes/restaurantsController');
const authController = require('./routes/authController')
const PORT = process.env.PORT || 5000;
require('./config/passport.config')

 
//Db connection
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
app.use(express.static('uploads'))
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout','layouts/layout')

app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true 
}));

app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/Foodcircles',collectionName: 'sessions'}),
    cookie: { 
        maxAge: 1000 * 60 * 60 *  24
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))

//Routes
app.use('/meal', mealController);
app.use('/reviews',reviewsController);
app.use('/article',articleController);
app.use('/catering',cateringController);
app.use('/contact',contactController);
app.use('/restaurants',restaurantsController);
app.use('/auth',authController)

//Check user is authenticated
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/auth/login')
  }



//Get home page
app.get('/',checkAuthenticated, (req,res) => {
    res.render('home',{
        title: "Home",
        
    });
})

//Logout
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/auth/login')
});


//Listening on port
app.listen(PORT,() => {
    console.log(`Listening at http://localhost:${PORT}:`);
});