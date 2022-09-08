const express = require('express')
const router = express.Router();
const Article = require('..//models/article.model');

//Get article page and all articles
router.get('/',async(req,res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'});
    res.render('articles/allarticles',{
        title: "Articles",
        articles: articles
    });
});


//Get new article page
router.get('/new',(req,res) => {
    res.render('articles/newarticle',{
        title: "New Article",
        article: new Article()
    })
});

//Get edit page
router.get('/edit/:id',async (req,res) => {
    const article = await Article.findById({_id: req.params.id})
    res.render('articles/editarticle',{
        title: "Edit Article",
        article: article
    });
});

//Create new article
router.post('/new',async(req,res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });

    try {
        article = await article.save();
        res.redirect('/article');
    } catch (error) {
        console.log(error);
        res.render('/')
    }
});



//Get specific article
router.get('/show/:id',async(req,res) => {
    const article = await Article.findById({_id: req.params.id})
    res.render('articles/showarticle',{
        title: "Article",
        article: article
    })
});

//Edit specific article
router.put('/edit/:id',async(req,res) => {
    let article

    try {
        article = await Article.findById({_id: req.params.id});
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        await article.save();
        res.redirect('/article');

    } catch (error) {
        if(article == null){
            res.redirect('/article')
        }
        else {
            res.render('article/editarticle',{
                title: "Edit Article",
                article: article
            })
        }
    }
    
    
});

//Delete article
router.delete('/:id',async (req,res) => {
    await Article.findByIdAndDelete({_id: req.params.id});
    res.redirect('/article')
});



module.exports = router;