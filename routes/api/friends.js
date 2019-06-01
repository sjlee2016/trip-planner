const express = require('express');
const router = express.Router();
const User = require('../../models/User'); 
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator/check'); 
    
// @route   post /api/friends/request
// @desc    send friend request to a user
// @access  private
router.post('/request', [ auth, 
    [
    check('email', 'email is required')
    .not()
    .isEmpty() 
    ]
], async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try{
        const user = await User.findById(req.user.id).select('-password'); 
        if(user==null){
            return res.status(404).json({err: "User not authorized"}); 
        }
        const other = await User.findOne({email : otherUsersEmail});
        
        if(other == null){
            return res.status(404).json({err: "Illegal Friend Request"}); 
        }else if(user.email == req.body.email) {

            return res.status(404).json({err: "Cannot send friend request to self"}); 
        }
        if ( user.sentFriendRequest.indexOf(req.body.email) > -1 || other.receivedFriendRequest.indexOf(user.email) > -1)
        {
            return res.status(404).json({err: "Friend request was already sent"}); 
        }
        other.receivedFriendRequest.push(user.email); 
        user.sentFriendRequest.push(otherUsersEmail); 
        await user.save(); 
        await other.save(); 
        return res.json({msg: 'Friend request sent successfully'}); 

    }catch(err){
        console.log(err);
        return res.status(400).json({err: err.message}); 
    }
}); 



// @route   get /api/friends/request
// @desc    get friend requests received
// @access  private
router.get('/request', auth,  async (req,res) => {
    
    try{
        const user = await User.findById(req.user.id).select('-password'); 
        if(user==null){
            return res.status(404).json({err: "User not found"}); 
        }
        const friendRequests = user.receivedFriendRequest; 
        return res.json(friendRequests); 

    }catch(err){
        console.log(err);
        return res.status(400).json({err: err.message}); 
    }
}); 



// @route   post /api/friends/accept
// @desc    accept friend requests received
// @access  private

// @route   post /api/friends/request
// @desc    send friend request to a user
// @access  private
router.post('/accept', [ auth, 
    [
    check('email', 'email is required')
    .not()
    .isEmpty() 
    ]
], async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try{
        const user = await User.findById(req.user.id).select('-password'); 
        const other = await User.findOne({email : req.body.email}); 
        if(user==null || other == null || user.email == req.body.email ){
            return res.status(404).json({err: "Illegal Friend Request"}); 
        }
        const index = user.receivedFriendRequest.indexOf(req.body.email);
        const index2 = other.sentFriendRequest.indexOf(user.email);
        if(index == -1 || index2 == -1 ) {
             return res.status(404).json({err: "Friend request does not exist"}); 
        }
        user.receivedFriendRequest.splice(index,1); 
        other.sentFriendRequest.splice(index2,1); 
        user.friends.push(req.body.email);
        other.friends.push(user.email);
        await user.save(); 
        await received.save(); 
        return res.json({msg: 'Friend request accepted successfully'}); 

    }catch(err){
        console.log(err);
        return res.status(400).json({err: err.message}); 
    }
}); 


// @route   post /api/friends/request
// @desc    cancel a friend request
// @access  private
router.post('/cancel', [ auth, 
    [
    check('email', 'email is required')
    .not()
    .isEmpty() 
    ]
], async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try{
        const user = await User.findById(req.user.id).select('-password'); 
        const other = await User.findOne({email : req.body.email}); 
        if(user==null || other == null || user.email == req.body.email ){
            return res.status(404).json({err: "Illegal Friend Request"}); 
        }
        const index = user.sentFriendRequest.indexOf(req.body.email);
        const index2 = other.receivedFriendRequest.indexOf(user.email);
        if(index == -1 || index2 == -1 ) {
             return res.status(404).json({err: "Friend request does not exist"}); 
        }
        user.sentFriendRequest.splice(index,1); 
        other.receivedFriendRequest.splice(index2,1); 
        await user.save(); 
        await received.save(); 
        return res.json({msg: 'Friend request canceled successfully'}); 

    }catch(err){
        console.log(err);
        return res.status(400).json({err: err.message}); 
    }
}); 
module.exports = router;