const express = require('express')
const Meal = require('./../models/meal.model')
const Shop = require('./../models/shop.model')
const router = express.Router()


//Get all meals from collection

router.get('/',(req,res) => {
    try {
        Meal.find((err,data) => {
            if(err){
                console.log(err)
            }
            else { 
                res.render('pages/shop',{
                    title: "Shop",
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
        Meal.find({$or:{item:{'regex':req.query.fsearch}}},(err,data) => {
            if(err){
                console.log(err);
            }
            else {
                res.render('pages/shop',{
                    data: data
                });
            }
        })
        
    } catch (error) {
        console.log(error);
    }
  
});



/*
router.get('/',async (req,res) => {
    //const breakfast = await Shop.findOne({ item: 'breakfast'});
    //const specials = await Shop.findOne({ item: 'specials'});
    //const pastry = await Shop.findOne({ item: 'pastry'});
    //const desserts = await Shop.findOne({ item: 'desserts'});
    //const kidsDishes = await Shop.findOne({ item: 'kids dishes'});
    //const saladsnSoup = await Shop.findOne({ item: 'salads and soups'});

    let searchOptions = {}
    if(req.query.food != null && req.query.food !== ''){
        searchOptions.food = new RegExp(req.query.food, 'i')
    }
    
    const shops = await Shop.find({'item': searchOptions});

    try {
        
        res.render('pages/shop',{
            title: "Shop",
            shops: shops,
            searchOptions: req.query
        })
    }
    catch {
        res.send('Error')
    }
});
*/

/*
router.post('/',(req,res) => {
    const food = req.body.food;
    if(req.body.food == null || ""){
        Shop.find({item: food},(err,result) => {
            if(err){
                console.log(err)
            }
            else{
                res.render('pages/shop',{
                    result : result
                })
            }
        })
    }
    else{
        res.redirect('/')
    }   
})
*/

module.exports = router;