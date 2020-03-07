const   mongoose                = require('mongoose');

const LogSchema = new mongoose.Schema({
    date: String,
    mood: Number,
    questionA: Number,
    questionB: Number,
    questionC: Number,
    comment: String
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;