const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
  item: {
    type: String
  },
  meals: [
    {
      name: {
        type: String
      },
      price: {
        type: Number
      }
    }
  ]
       
});

module.exports = mongoose.model('Shop', shopSchema)