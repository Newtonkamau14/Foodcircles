const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.render('pages/restaurants',{
        title: "Restaurants"
    });
})

module.exports = router;