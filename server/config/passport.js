var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var User = require('../models/User');

var configAuth = require('./auth');

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err,user);
		});
	});

    // passport.use('local-signup', 
    //     new LocalStrategy(
	// 	function(email, password,  done) {
    //         	User.findOne({'local.email': email}, function(err, user) {
	// 				if (err)
	// 					return done(err);
	// 				if (user) {
	// 					return done(null, false);
	// 				} else {
	// 					var newUser = new User();
	// 					newUser.local.email = email;
	// 					newUser.local.password = newUser.generateHash(password)
	// 					newUser.save(function(err) {
	// 						if (err)
    //                            return done(err);
    //                         else
    //                            return(done,user);
    //                     });
                        
	// 				}

	// 			});

	// 	}));

	 passport.use(new LocalStrategy(
        function(email, password, done) {
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false);

            if (!user.validPassword(password))
                return done(null, false);

            return done(null, user);
        });

    }));

	// passport.use(new GoogleStrategy({

    //     clientID        : configAuth.googleAuth.clientId,
    //     clientSecret    : configAuth.googleAuth.clientSecret,
    //     callbackURL     : configAuth.googleAuth.callbackUrl,
    //     passReqToCallback   : true

    // },
    // function(request, accessToken, refreshToken, profile, done) {

    //     // make the code asynchronous
    //     // User.findOne won't fire until we have all our data back from Google
    //     process.nextTick(function() {

    //         // try to find the user based on their google id
    //         User.findOne({ 'google.id' : profile.id }, function(err, user) {
    //             if (err)
    //                 return done(err);

    //             if (user) {

    //                 // if a user is found, log them in
    //                 return done(null, user);
    //             } else {
    //                 // if the user isnt in our database, create a new user
    //                 var newUser          = new User();
    //                 console.log(profile.id);
    //                 // set all of the relevant information
    //                 newUser.google.id    = profile.id;
    //                 newUser.google.token = token;
    //                 newUser.google.name  = profile.displayName;
    //                 newUser.google.email = profile.emails[0].value; // pull the first email

    //                 // save the user
    //                 newUser.save(function(err) {
    //                     if (err)
    //                         throw err;
    //                     return done(null, newUser);
    //                 });
    //             }
    //         });
    //     });

    // }));

	
};