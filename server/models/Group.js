var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var groupSchema = mongoose.Schema({

    member : [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    ],

    admin : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    
    
});


module.exports = mongoose.model('Group', groupSchema);