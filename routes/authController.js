const express = require('express');
const passport = require('passport')
const User = require('../models/user.model')
const router = express.Router()
require('./../config/passport.config')

//Login 
router.get('/login',(req,res) =>{
    res.render('pages/login',{
        title: 'Login'
    });
});

router.post('/login',passport.authenticate('local',{ successRedirect:'/'}))

//Register
router.get('/register',(req,res) => {
    res.render('pages/register',{
        title: 'Register'
    });
})

router.post('/register', async (req,res) => {
    let user = new User({
       email: req.body.email,
       phonenumber: req.body.phonenumber,
       password: req.body.password
    });    
    try {
        user = await user.save();
        res.redirect('/auth/login'); 
    } 
    catch  {
        res.redirect('/auth/register');
    }
})

module.exports = router;