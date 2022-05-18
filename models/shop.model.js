const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
   
    name: {
        type: String
    },
    price: {
        type: String
    }
           
});

module.exports = mongoose.model('Shop', shopSchema)