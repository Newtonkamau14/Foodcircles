const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    location : { 
        type: String
    }
})

module.exports = mongoose.model('Restaurant',restaurantSchema)