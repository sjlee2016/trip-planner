const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const isGroupAdmin = require("../../middleware/groupAdmin");
const Group = require('../../models/Group');
const Response = require('../../global/Response');  
const {
    check,
    validationResult
} = require('express-validator/check');


// @route   post /api/groups/request
// @desc    send group join request to admin
// @access  private
router.post('/make', [auth,
    [
        check('name', 'name is required')
        .not()
        .isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user == null) {
            return res.status(ResponseStatus.UNAUTHORIZED).json({
                err: "User not authorized"
            });
        }

        const groupFields = {};
        groupFields.user = [];
        groupFields.admin = [];
        groupFields.name = req.body.name;
        const group = new Group(groupFields);
        group.admin.push(req.user.id);
        group.user.push(req.user.id);
        user.groups.push(group.id);

        await user.save();
        await group.save();
        return res.json({
            msg: 'Group made successfully'
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            err: err.message
        });
    }
});


// @route   post /api/groups/request
// @desc    send group join request to admin
// @access  private
router.get('/find/name', [auth,
    [
        check('name', 'name is required')
        .not()
        .isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const page = req.body.page !== null ? req.body.page : 0;
        const limit = req.body.limit !== null ? req.body.limit : 5;

        Group.find({
            name: req.body.name
        }).skip(page * limit).limit(limit).sort({
            "user": 1
        }).exec(function (err, groups) {
            var groupMap = {};
            if (err) {
                return res.status(400).json({
                    err: err.message
                });
            }
            if (groups == null || groups.length == 0) {
                return res.json({
                    msg: "No group found with the name " + req.body.name
                });
            }
            groups.forEach(group => {
                groupMap[group._id] = group;
            });
            return res.json(groupMap);
        });



    } catch (err) {
        console.log(err);
        return res.status(400).json({
            err: err.message
        });
    }
});


// @route   post /api/groups/request
// @desc    send group join request to admin
// @access  private
router.post('/request', [auth,
    [
        check('groupId', 'group id is required')
        .not()
        .isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user == null) {
            return res.status(404).json({
                err: "User not authorized"
            });
        }
        const group = await Group.findOne({
            _id: req.body.groupId
        });

        if (group == null) {
            return res.status(404).json({
                err: "Group not found"
            });
        }

        if (user.groupRequest.indexOf(req.body.groupId) > -1) {
            return res.status(404).json({
                err: "Group request was already sent"
            });
        }

        if (group.requests.indexOf(user.email) > -1) {
            return res.status(404).json({
                err: "User has already joined this group"
            });
        }
        group.requests.push(user.email);
        user.groupRequest.push(req.body.groupId);
        await user.save();
        await group.save();
        return res.json({
            msg: 'Group request sent successfully'
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            err: err.message
        });
    }
});



// @route   post /api/friends/accept
// @desc    accept friend requests received
// @access  private

// @route   post /api/friends/request
// @desc    send friend request to a user
// @access  private
router.post('/accept', [auth, isGroupAdmin,
    [
        check('groupId', 'group id is required')
        .not()
        .isEmpty(),
        check('email')
        .not()
        .isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const user = await User.findOne({
            email: req.body.email
        }).select('-password');
        const group = await Group.findById(req.body.groupId);
        const groupIndex = group.requests.indexOf(user.email);
        const userIndex = user.groupRequest.indexOf(req.body.groupId); 
        if (groupIndex == -1 || userIndex == -1) {
            return res.status(404).json({
                msg: 'This request does not exists'
            });
        }

        group.requests.splice(groupIndex, 1);
        user.groupRequest.splice(userIndex,1);
        group.user.push(user.id);
        user.groups.push(req.body.groupId);
        group.save();
        user.save();
        return res.json({
            msg: 'Group join request accepted successfully'
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            err: err.message
        });
    }
});


// @route   post /api/groups/admin
// @desc    cancel a friend request
// @access  private
router.post('/cancel', [auth,
    [
        check('groupId', 'email is required')
        .not()
        .isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const group = await Group.findById(req.body.groupId);
        const groupIndex = group.requests.indexOf(user.email);
        const userIndex = user.groupRequest.indexOf(req.body.groupId); 
        if(groupIndex==-1 || userIndex==-1){
            return res.status(400).json({msg: 'No Group Request found'});
        }

        group.requests.splice(groupIndex,1); 
        user.groupRequest.splice(userIndex,1); 
        group.save();
        user.save(); 
        return res.json({msg: 'Group Request Successfully canceled'}); 
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            err: err.message
        });
    }
});



// @route   post /api/groups/request
// @desc    send group join request to admin
// @access  private
router.post('/leave', [auth,
    [
        check('groupId', 'group id is required')
        .not()
        .isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user == null) {
            return res.status(404).json({
                err: "User not authorized"
            });
        }
        const group = await Group.findById(req.body.groupId);
        if (group == null) {
            return res.status(Response.STATUS.NOT_OK).json({
               msg : Response.MESSAGE.NOT_OK
            });
        }
        const isUser = group.user.indexOf(user.id); 
        const adminIndex = group.admin.indexOf(user.id);
        const userIndex = user.groups.indexOf(req.body.groupId); 
        if( isUser == -1 || userIndex == -1 ){
            return res.status(400).json({msg: 'User is not a member of this group'});
        }

        group.user.splice(isUser,1);
        group.admin.splice(adminIndex,1);
        user.groups.splice(userIndex,1); 
        
    
        if(group.admin.length == 0) {
            if(group.user.length > 1){
            return res.status(400).json({msg: 'Cannot leave since you are the only admin'});
            }else{
                group.remove(); 
                user.save(); 
                return res.status(400).json({msg: 'Group deleted'});
            }
        }
        group.save(); 
        user.save(); 
        
        return res.status(400).json({msg: 'Successfully left the group'});

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            err: err.message
        });
    }
});

module.exports = router;