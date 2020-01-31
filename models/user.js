const   mongoose                = require('mongoose'),
        bcrypt                  = require('bcryptjs'),
        passportLocalMongoose   = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    entries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Log'
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;