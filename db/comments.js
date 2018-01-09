var mongoose = require('mongoose')

mongoose.connect('mongodb://ramirez:alexandre033@ds139436.mlab.com:39436/campsground');
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
