const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    restaurantName : {
        type: String,
        required: true
    },
    mealtype: {
        type: String,
    },
    stars: {
        type: Numbers,
        required: true
    },
    description : { 
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Review',reviewSchema)