const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type: String, 
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar : {
        type: String 
    },
    date: {
        type : Date,
        default : Date.now 
    },
    sentFriendRequest : [String],
    receivedFriendRequest: [String],
    friends : [String],
    groupRequest : [String], 
    groups : [String],
    isVerified: {
        type : Boolean,
        default : false 
    } 
});

module.exports = User = mongoose.model('user', UserSchema); 

