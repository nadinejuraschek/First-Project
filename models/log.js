const   mongoose                = require('mongoose');

const LogSchema = new mongoose.Schema({
    date: Date,
    mood: String,
    questionA: String,
    questionB: String,
    questionC: String,
    comment: String
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;