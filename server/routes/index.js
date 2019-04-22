var express  = require('express');
const authMiddleware = (req,res,next) => {
    if(!req.isAuthenticated()) {
        res.status(401).send("You are not authenticated");
        
    }else {
        return next(); 
    }
};

var User = require("../models/User");

module.exports = function(app, passport){
    
    app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
    app.use(express.json());
	app.post('/login', (req,res) => {
    req.session.email = req.body.email;
    req.session.password = req.body.password; 
    passport.authenticate('local-login', (err,user,info) => {
        if(err){
            return res.status(400).send("failure"); 
        }

        if(!user){
            return res.status(400).send([user,"cannot log in", info]); 
        }

        req.login(user, err => {
            console.log("[SIGN-UP] successfully logged in");
            res.send("logged in");
        })

    })(req,res);
    });     

	app.post('/signup', (req,res) => {
        User.findOne({'local.email': req.body.email}, function(err, user) {
            if(err){
                console.log("[SIGN-UP] failed to sign up");
                return res.status(400).send("failed to sign up");
            }
            if(user){
                console.log("[SIGN-UP] Email already exists");
                return res.status(400).send("failed. email already exists");
            }
            else{
             var newUser = new User();
             newUser.local.email = req.body.email;
             newUser.local.password = newUser.generateHash(req.body.password)
             newUser.local.name = req.body.name; 
	         newUser.save(function(err) {
             if (err)
             {
                console.log("i am here");
                return res.status(400).send("failed to sign up");
             }
             else
             {
                console.log("successful");
                return res.status(300).send("successful");
             }
       });
        }                 
    });
});  
    

	app.get('/profile', authMiddleware, (req, res) => {
        console.log("successful!");
        return 	req.user;
	});

	app.get('/logout', function(req, res){
        req.logout();
        console.log("logged out");
        return res.send(); 
	});

	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));



};