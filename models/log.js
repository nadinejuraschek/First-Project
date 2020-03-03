const   mongoose                = require('mongoose'),
        passportLocalMongoose   = require('passport-local-mongoose');

const LogSchema = new mongoose.Schema({
    date: Date,
    mood: Number,
    questionA: Number,
    questionB: Number,
    questionC: Number,
    comment: String
});

LogSchema.plugin(passportLocalMongoose);

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;