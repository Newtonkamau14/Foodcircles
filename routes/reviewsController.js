const express = require('express')
const Review = require('./../models/review.model')
const router = express.Router()

//Get all reviews page
router.get('/',async (req,res) => {
    const reviews = await Review.find();
    res.render('reviews/reviews',{
        title: "Reviews",
        reviews: reviews
    });
});

//Get new review page
router.get('/new',(req,res) => {
    res.render('reviews/newreview',{
        title: "New Review"
    })
})


//Post review 
router.post('/new',async(req,res) => {
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