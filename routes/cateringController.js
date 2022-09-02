const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.render('catering',{
        title: "Catering"
    });
});

module.exports = router;