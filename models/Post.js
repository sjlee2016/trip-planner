
const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    "user" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    "title": {
        type : String,
        required : true 
    },
    "tag" : [ {
        type : String
    }
    ], 
    "text" : {
        type : String,
        required : true
    }, 
    "likes" : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'user'
            }
        }
    ],
    "dislikes" : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'user'
            }
        }
    ],
    "comments" : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'user'
            },
            text : {
                type : String,
                required : true 
            },
            avatar : {
                type: String 
            },
            date : {
                type: Date,
                default : Date.now
            }
        }
    ],
    date : {
        type: Date,
        default : Date.now
    }
});


module.exports = Post = mongoose.model('post', PostSchema);
