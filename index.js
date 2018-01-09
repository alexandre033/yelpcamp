var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var flash = require('connect-flash')
var User = require('./db/users.js')
var seedDB = require('./seed.js')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var camprgroundsRoutes = require('./routes/campgrounds.js')
var commentsRoutes = require('./routes/comments.js')
var indexRoutes = require('./routes/index.js')
var methodOverride = require('method-override')


//seedDB();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

//Method methodOverride
app.use(methodOverride('_method'))
app.use(flash())
//passport
app.use(require('express-session')({
  secret : "Ramirez is the best",
  resave : false,
  saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error")
  res.locals.success = req.flash("success")
  next();
})

//Routes
app.use(commentsRoutes)
app.use(indexRoutes)
app.use(camprgroundsRoutes)



app.listen(3000, function(){
  console.log('server init')
})
