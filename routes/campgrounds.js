var express = require('express');
var router = express.Router();
var Camp = require('../db/dbcamp.js')
var middleware = require('../middleware')


//find all camps
router.get('/campsground', function(req, res){
  Camp.find(function (err, camps) {
    if (err) return console.error(err);
  res.render('./campsground/index.ejs', {camps});
  })
})

//add new camps to database
router.post('/campsground', middleware.isLoggedIn, function(req, res){
  var name = req.body.name
  var image = req.body.image
  var description = req.body.description
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCamps = {name, image, description, author}

  Camp.create(newCamps, function(err, newCamp){
    if(err){
      console.log(err)
    }else{
        res.redirect('/campsground')
    }
  })

});

//form for new camps
router.get('/campsground/new',middleware.isLoggedIn, function(req, res){
  res.render('./campsground/new.ejs')
})

//Show the camp ground
router.get('/campsground/:id', function(req, res){
  var id = req.params.id
  Camp.findById(id).populate("comments").exec(function(err, camp){
    err ? console.log(err) : res.render('./campsground/show.ejs', {camp})
  })
});

//EDIT campgrounds form
router.get('/campsground/:id/edit', middleware.checkCampsgroundOwnership, function(req, res){
  var id = req.params.id
  Camp.findById(id, function(err, camp){
    err ? console.log(err) : res.render('./campsground/edit.ejs', {camp})
  })
})

//EDIT Campsground in DB
router.put('/campsground/:id',middleware.checkCampsgroundOwnership, function(req, res){
  var id = req.params.id
  var name = req.body.name
  var image = req.body.image
  var description = req.body.description
  var updateCamp = {name, image, description}
  Camp.findByIdAndUpdate(id, updateCamp, function(err, updateCamp){
    err ? console.log(err) : res.redirect('/campsground/'+id)
  })
})

//DELETE campsground
router.delete('/campsground/:id',middleware.checkCampsgroundOwnership, function(req, res){
  Camp.findByIdAndRemove(req.params.id, function(err){
    err ? res.redirect('/campsground') : res.redirect("/campsground")

  })
})

module.exports = router;
