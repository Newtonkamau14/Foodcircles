const express = require('express')
const multer = require('multer')
const Restaurant = require('./../models/restaurant.model')
const router = express.Router()

//Define storage for the images
const storage = multer.diskStorage({
    //Destination for files
    destination:function(req,file,callback){
        callback(null,'./uploads')
    },

    //add back the extension
    filename:function(req,file,callback) {
        callback(null,file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
}); 


//upload parameters for multer
const upload = multer({
    storage: storage,
    limits:{
        fieldSize:1024*1024*3
    },
}).single('image');

//Get restaurant names
router.get('/',async (req,res) => {
    const restaurants = await Restaurant.find();
    res.render('restaurants/restaurants',{
        title: "Restaurants",
        restaurants: restaurants
    });
})

//Get new restaurant page
router.get('/add',(req,res) => {
    res.render('restaurants/addrestaurant',{
        title: "Add Restaurant"
    })
})

//Add new restaurants
router.post('/add',upload,async(req,res) => {
    let restaurant = new Restaurant({
        name: req.body.name,
        location: req.body.location,
        image: req.file.filename
    });
    try {
        restaurant = await restaurant.save();
        res.redirect('/restaurants')

    } catch (error) {
        console.log(error);
        res.render('/restaurants/add')
        
    }
    
})

module.exports = router;