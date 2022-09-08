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
        title: "New Review",
        review: new Review()
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
        res.redirect('/reviews')
        
    } catch (error) {
        console.log(error);
        res.render('/review')        
    }
});

//Get edit review page
router.get('/edit/:id',async (req,res) => {
    const review = await Review.findById({_id: req.params.id});
    res.render('reviews/editreview',{
        title: "Edit Review",
        review: review
    })
});

//Edit review
router.put('/edit/:id',async (req,res) => {
    let review

    try {
        review = await Review.findById({_id:req.params.id});
        review.mealType =  req.body.mealType
        review.stars = req.body.stars
        review.description = req.body.description
        await review.save()
        res.redirect('/reviews')

    } catch (error) {
        if (review == null) {
            res.redirect('/reviews')
        } else {
            res.render('reviews/editreview',{
                title: "Edit Review",
                review: review
            })
        }
    }
    
});

//Delete review
router.delete('/delete/:id',async (req,res) => {
    await Review.findByIdAndDelete({_id:req.params.id});
    res.redirect('/reviews')
})


module.exports = router;