const express = require('express')
const Article = require('../models/article.model')
const router = express.Router()

router.get('/',(req,res) => {
    res.render('pages/allarticles',{
        title: "All Articles"
    });
});

router.get('/new',(req,res) => {
    res.render('pages/newarticle',{
        title: "New Article"
    });
});

router.post('/', async (req,res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try {
        article = await article.save();
        res.redirect();
    }
    catch(e) {
        console.log(e);
        res.render('pages/newarticle');
    }
});

module.exports = router;