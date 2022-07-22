const express = require('express')
const Review = require('./../models/review.model')
const router = express.Router()

//Get review page
router.get('/', (req,res) => {
    res.render('pages/reviews',{
        title: "Reviews"
    });
});

//Post review 
router.post('/',async(req,res) => {
    let review  = new Review({
        restaurantName: req.body.restaurantName,
        mealType: req.body.mealType,
        stars: req.body.stars,
        description: req.body.description
    });
    try {
        review = await review.save();
        res.redirect('/')
        
    } catch (error) {
        console.log(error);
        res.render('/review')        
    }
})


module.exports = router;