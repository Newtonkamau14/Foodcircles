const express = require('express');
const passport = require('passport')
const User = require('../models/user.model')
const router = express.Router()
require('./../config/passport.config')

function checkNotAuthenticated(req,res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

//Login 
router.get('/login',checkNotAuthenticated,(req,res) =>{
    res.render('pages/login',{
        title: 'Login'
    });
});

router.post('/login',checkNotAuthenticated,passport.authenticate('local',{ successRedirect:'/',failureRedirect:'/auth/login'}))

//Register
router.get('/register',checkNotAuthenticated,(req,res) => {
    res.render('pages/register',{
        title: 'Register'
    });
})

router.post('/register',checkNotAuthenticated, async (req,res) => {
    let user = new User({
       username: req.body.username, 
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