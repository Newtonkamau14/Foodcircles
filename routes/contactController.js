const express = require('express')
const router = express.Router();
const Contact = require('./../models/contact.model');

router.get('/', (req,res) => {
    res.render('pages/contact',{
        title: "Contact",
        viewTitle: "Contact Form"
    });
});

router.post('/',async (req,res) => {
    let contact = new Contact({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        message: req.body.message
    });

    try {
        contact = await contact.save();
        res.redirect('/home')
    }
    catch(e) {
        console.log(e);
        res.render('/contact');
    }
})



module.exports = router;