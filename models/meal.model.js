const mongoose = require('mongoose')


const mealSchema = new mongoose.Schema({
    type: {
        type: String
    },
    meal: {
        name: {
            type: String
        },
        price: {
            type: Number
        }
    }

});

module.exports = mongoose.model('Meal',mealSchema);