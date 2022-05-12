const express = require('express')
const Shop = require('./../models/shop.model')
const router = express.Router()

router.get('/',async (req,res) => {
    const shops = await Shop.find()
    res.render('pages/shop',{
        title: "Shop",
        shops: shops
    });
});


module.exports = router;