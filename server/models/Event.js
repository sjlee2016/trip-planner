var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    desc: String,
    like: Number,
    dislike: Number,
    author : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});


module.exports = mongoose.model('Event', eventSchema);