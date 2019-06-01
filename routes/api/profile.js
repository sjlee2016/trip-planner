const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile'); 
const User = require('../../models/User'); 
const { check, validationResult } = require('express-validator/check');


// @route   get api /profile/me 
// @desc    Fetch My profile
// @access  private
router.get('/me', auth, async (req,res) => {

    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', 
        ['name', 'avatar']);
        
        if(!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile); 

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
); 

// @route   post api /profile/
// @desc    Create / Update User Profile 
// @access  private
router.post('/', [auth , [
    check('status', 'Status is required')
    .not()
    .isEmpty(),
    check('skills', 'Skills is required')
    .not()
    .isEmpty() 
    
] ] ,
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()}); 
    }
    const {
        status
    } = req.body; 

    const profileFields = {} ;
    profileFields.status = status; 

    try {
        let profile = await Profile.findOne({ user : req.user.id}); 

        if(profile){
            // Update 
            profile = await Profile.findOneAndUpdate({user: req.user.id}, { $set: profileFields},
            {new: true}
        );
        return res.json(profile); 
        }
        
        // Create 

        profile = new Profile(profileFields); 
        await profile.save();
        return res.json(profile); 
    }catch(err){
        console.error(err.message);
        return res.status(500).json({msg:'Server Error'}); 
    }
    
}
); 

// @route   get api /profile
// @desc    Get all profiles
// @access  public
router.get('/', async(req,res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.send(profiles); 
    }catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
})

// @route   get api /profile/user/user_id
// @desc    Get profile by user ID 
// @access  public
router.get('/user/:user_id', async(req,res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({msg : 'User profile not found'}); 
        }
        res.send(profile); 
    }catch(err)
    {
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg : 'User profile not found'}); 
        }
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
})


// @route   delete api/profile/
// @desc    delete profile 
// @access  private
router.delete("/", auth, 
async(req,res) => {
    try{
        await Profile.findOneAndRemove({user:req.user.id});

        await User.findOneAndRemove({ _id : req.user.id}); 
        return res.json({msg: 'User deleted'});
    }catch(err){
        console.log(err.message);
        return res.json({msg: 'Server Error'}); ß
    }
});

module.exports = router; 