const express = require('express')
const router = express.Router()
const Article = require('./../models/article.model')

//Display all articles
router.get('/',async (req,res) => {
    const articles = await Article.find()
    res.render('pages/allarticles',{
        title: "All Articles",
        articles: articles
    });
});

//Get  a new article
router.get('/new',(req,res) => {
    res.render('pages/newarticle',{
        title: "New Article"
    });
});

//Create a new article
router.post('/', async (req,res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try {
        article = await article.save();
        res.redirect(`/blog/${article.id}`);
    }
    catch(e) {
        console.log(e);
        res.render('/blog/new');
    }
});

module.exports = router;