const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); 
const User = require('../../models/User'); 
const {check, validationResult} = require('express-validator/check'); 
const jwt = require('jsonwebtoken'); 
const config = require('config');
const bcrypt = require('bcryptjs'); 
const crypto = require('crypto'); 
const nodemailer = require('nodemailer');
const EmailToken = require('../../models/EmailToken'); 
// @route   get api /auth
// @desc    Test route
// @access  protected 
router.get('/', auth, 
async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        res.json(user);   // payload is the user 
    }catch(err){
        console.error(err.message);
        return res.status(400).json(); 
    }
}
); 


// @route   get api /login
// @desc    login user
// @access  public 
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
] , async (req,res) => {
    
   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()});
   }

   const { email, password } = req.body; 

   try {
       let user = await User.findOne({ email });

       if(!user){
           return res.status(400).json({msg : 'Invalid Credentials'});
       }
       // CHECK PASSWORD 
       const isMatch = await bcrypt.compare(password, user.password); 

       if(!isMatch){
           return 
           res
           .status(400)
           .json({errors: [{msg: 'Invalid Credentials'}]}); 
       }
       const payload = {
           user : {
               id: user.id
           }
       }
      

       // Json Web Token 
       jwt.sign(
           payload, 
           config.get('jwtSecret'),
           { expiresIn : 36000 },
           (err, token) => {
               if(err) throw err;
               return res.json({ token }); 
           }
        ); 


   }catch(err){
       console.error(err.message);
       res.status(500).send('Server Error');
   }
}); 

module.exports = router; 