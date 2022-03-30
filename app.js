const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
const path = require('path')
const bodyParser = require('body-parser')
const homeController = require('./routes/homeController');
const shopController = require('./routes/shopController');
const reviewsController = require('./routes/reviewsController')
const blogController = require('./routes/blogController');
const cateringController = require('./routes/cateringController');
const contactController = require('./routes/contactController');
const restaurantsController = require('./routes/restaurantsController');
const PORT = process.env.PORT || 3000;
const app = express()

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
app.set('views',path.join(__dirname + '/views'));
app.engine('hbs',exphbs.engine(({ extname: 'hbs', defaultLayout: 'mainLayout', layoutDir:__dirname + '/views/layouts/'})));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//Routes
app.use('/home', homeController);
app.use('/shop', shopController);
app.use('/reviews',reviewsController);
app.use('/blog',blogController);
app.use('/catering',cateringController);
app.use('/contact',contactController);
app.use('/restaurants',restaurantsController);



app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`);
});