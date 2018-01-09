var express = require('express');
var router = express.Router();
var User = require('../db/users.js')
var passport = require('passport')

//show index
router.get('/', function(req, res){
  res.render('landing.ejs');
})

//===========================================
//AUTHENTICATION ROUTES
//===========================================
router.get('/register', function(req, res){
  res.render('./auth/register.ejs')
})

router.post('/register', function(req, res){
  User.register(new User({username : req.body.username}), req.body.password, function(err, user){
    if(err){
      req.flash('error', err.message)
      res.redirect('/register')
    }
    passport.authenticate('local')(req, res, function(){
      req.flash('success', 'Welcome in Campsground '+req.body.username)
      res.redirect('/campsground')
    })
  })
});

router.get('/login', function(req, res){
  res.render('./auth/login.ejs')
});

router.post('/login', passport.authenticate("local",{
  successRedirect : "/campsground",
  failureRedirect : "/login"
}), function(req, res){
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You\'re loggout !!')
  res.redirect('/campsground')
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

module.exports = router;
