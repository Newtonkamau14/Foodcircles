const express = require('express')
const multer = require('multer')
const Restaurant = require('./../models/restaurant.model')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const router = express.Router()

//Define storage for the images
const storage = multer.diskStorage({
    //Destination for files
    destination:function(req,file,callback){
        callback(null,'./public/uploads/images')
    },

    //add back the extension
    filename:function(req,file,callback) {
        callback(null, Date.now() )
    }
}); 


//upload parameters for multer
const upload = multer({
    storage: storage,
    limits:{
        fieldSize:1024*1024*3
    },
});

//Get restaurant names
router.get('/', (req,res) => {
    res.render('pages/restaurants',{
        title: "Restaurants"
    });
})

//Get new restaurant page
router.get('/add',(req,res) => {
    res.render('pages/addrestaurant',{
        title: "Add Restaurant"
    })
})

//Add new restaurants
router.post('/add',async(req,res) => {
    
})

module.exports = router;