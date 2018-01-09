var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

mongoose.connect('mongodb://ramirez:alexandre033@ds139436.mlab.com:39436/campsground');
var UserSchema = mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema);
