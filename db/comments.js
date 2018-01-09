var mongoose = require('mongoose')

mongoose.connect('link to db');
var commentsSchema = mongoose.Schema({
    title: String,
    author: {
      id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
      },
      username: String
    }
});
module.exports = mongoose.model('Comment', commentsSchema);
