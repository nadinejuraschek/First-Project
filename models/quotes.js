const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    quote: String,
    author: String
});

module.exports = mongoose.model('Quote', QuoteSchema);