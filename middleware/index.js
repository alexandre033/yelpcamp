var Camp = require('../db/dbcamp.js')
var Comments = require('../db/comments.js')
var middlewareObj = {}

middlewareObj.checkCampsgroundOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Camp.findById(req.params.id,function(err, camp){
      if(err){
        res.redirect("back")
      }else{
        //Does user own the camps
        if(camp.author.id.equals(req.user._id)){
          next()
        }else{
          res.redirect('back')
        }
      }
    })
  }else{
    res.redirect('back')
  }
}

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  req.flash('error', 'You need to be logged In !!')
  res.redirect('/login')
}

middlewareObj.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Comments.findById(req.params.comment_id,function(err, comment){
      if(err){
        res.redirect("back")
      }else{
        //Does user own the comment
        if(comment.author.id.equals(req.user._id)){
          next()
        }else{
          res.redirect('back')
        }
      }
    })
  }else{
    res.redirect('back')
  }
}

module.exports = middlewareObj;
