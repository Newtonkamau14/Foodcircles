const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    issue: {
        type: String
    },
    message: {
        type: String
    }
});

module.exports = mongoose.model('Contact',contactSchema);