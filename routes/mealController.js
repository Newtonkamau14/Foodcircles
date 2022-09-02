const express = require('express')
const Meal = require('../models/meal.model');
const Shop = require('../models/shop.model')
const router = express.Router()


//Get all meals from collection
router.get('/',(req,res) => {
    try {
        Meal.find((err,data) => {
            if(err){
                console.log(err)
            }
            else { 
                res.render('meal',{
                    title: "Meals",
                    data:data
                });
            }
        })
        
    } catch (error) {
        console.log(error);
        
    }
    
});

//Search foods available
router.get('/search',(req,res) => {
    try {
        Meal.find({type:req.query.fsearch},(err,data) => {
            if(err){
                console.log(err);
            }
            else {
                res.render('meal',{
                    title: "Meals",
                    data:data
                });
            }
        })
        
    } catch (error) {
        console.log(error);
    }
  
});



module.exports = router;