const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    restaurantName : {
        type: String,
        required: true
    },
    mealType: {
        type: String,
    },
    stars: {
        type: Number,
        required: true
    },
    description : { 
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Review',reviewSchema)