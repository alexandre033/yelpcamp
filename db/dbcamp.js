//db session
var mongoose = require('mongoose')

mongoose.connect('link to db');
var campsSchema = mongoose.Schema({
    name: String,
    image: String,
    description : String,
    author : {
      id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
      },
      username : String
    },
    comments : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
      }
    ]
});
var CampsModel = mongoose.model('CampsModel', campsSchema);
module.exports = CampsModel
