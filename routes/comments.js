var express = require('express');
var router = express.Router({mergeParams : true});
var Camp = require('../db/dbcamp.js')
var Comments = require('../db/comments.js')
var middleware = require('../middleware')

router.get("/campsground/:id/comment/new",middleware.isLoggedIn, function(req, res){
  Camp.findById(req.params.id, function(err, camp){
    err ? console.log(err) : res.render('./comments/new.ejs', {camp})
  })
})

router.post('/campsground/:id/comment', middleware.isLoggedIn, function(req, res){
  var author = req.body.author
  var title = req.body.title
  var id = req.params.id
  Comments.create({
    author : author,
    title : title
  }, function(err, comment){
    if(err){
      console.log(err)
    }else{
      Camp.findById(id, function(err, camp){
        comment.author.id = req.user._id
        comment.author.username = req.user.username
        comment.save()
        camp.comments.push(comment)
        camp.save()
        res.redirect('/campsground/'+camp._id)
      })
    }
  })

})

//EDIT Comments
router.get('/campsground/:id/comment/:comment_id/edit',middleware.checkCommentOwnership, function(req, res){
  Camp.findById(req.params.id, function(err, camp){
    if(err){
      console.log(err)
    }else{
      Comments.findById(req.params.comment_id, function(err, comment){
        res.render('./comments/edit.ejs', {camp, comment})
      })
    }
  })
})

router.put("/campsground/:id/comment/:comment_id", middleware.checkCommentOwnership, function(req, res){
  var text = req.body.title
  Comments.findByIdAndUpdate(req.params.comment_id, {title:text}, function(err, newComment){
    if(err){
      console.log(err)
    }else{
      res.redirect('/campsground/'+req.params.id)
    }
  })
})

//Comment destroy
router.delete('/campsground/:id/comment/:comment_id',middleware.checkCommentOwnership, function(req, res){
  Comments.findByIdAndRemove(req.params.comment_id, function(err, comment){
    if(err){
      res.redirect("back")
    }else{
      res.redirect('/campsground/'+req.params.id)
    }
  })
})


module.exports = router;
