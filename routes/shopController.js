const express = require('express')
const Shop = require('./../models/shop.model')
const router = express.Router()

router.get('/',async (req,res) => {
    const breakfast = await Shop.findOne({ item: 'breakfast'});
    const specials = await Shop.findOne({ item: 'specials'});
    const pastry = await Shop.findOne({ item: 'pastry'});
    const desserts = await Shop.findOne({ item: 'desserts'});
    const kidsDishes = await Shop.findOne({ item: 'kids dishes'});
    const saladsnSoup = await Shop.findOne({ item: 'salads and soup'});

    res.render('pages/shop',{
        title: "Shop",
        breakfast: breakfast,
        specials: specials,
        pastry: pastry,
        desserts: desserts,
        kidsDishes: kidsDishes,
        saladsnSoup: saladsnSoup
    });
});


module.exports = router;