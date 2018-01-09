//db session
var mongoose = require('mongoose')

mongoose.connect('mongodb://ramirez:alexandre033@ds139436.mlab.com:39436/campsground');
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
