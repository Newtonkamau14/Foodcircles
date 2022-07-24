const mongoose = require('mongoose')
const slugify = require('slugify')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

blogSchema.pre('validate',function(next) {
    if(this.title){
        this.slug = slugify(this.title, { lower: true, strict: true})
    }
    next()
})

module.exports = mongoose.model('Blog', blogSchema);