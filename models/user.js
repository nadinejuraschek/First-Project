const   mongoose                = require('mongoose'),
        bcrypt                  = require('bcryptjs'),
        passportLocalMongoose   = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;