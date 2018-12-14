const jwt = require ('jsonwebtoken');
const PassportGoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require ('../../config');
const User = require ('../models/user');


/**
 * Return the Passport Google Strategy object.
 */

 module.exports = new PassportGoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_ID,
    callbackURL:"/api/auth/login/google/callback",
    // profileFields: ['id', 'displayName', 'emails'],
    // passReqToCallback : true
 },
 (accessToken, refreshToken, profile, done) => {
    console.log(profile);
     
        if(!req.user) {//confirm that user not loggedin
            User.findOne ({'google.id': profile._json.id}), (err, user)=>{
                if (err) { return done(err); }

                if (user) {
                    return done(null, user);
                }
                else{
                    const newUser = new User();
                    newUser.google.id = profile._json.id;
                    newUser.google.token = accessToken;
                    newUser.google.displayName = profile._json.displayName;
                    newUser.google.email =  profile._json.emails[0].value;

                    newUser.save((err)=>{
                        console.error(err);
                        return done(err);
                    });
                    return done(null, newUser);
                }
            }
        
        }else{//user exists and is loggedin
            const user = req.user; // pull the user out of the session
            // update the current users facebook credentials
            user.google.id = profile._json.id;
            user.google.token = accessToken;
            user.google.displayName = profile._json.displayName;
            user.google.email =  profile._json.emails[0].value;

            // save modifications to user
            user.save(function(err) {
                if (err) {
                    console.error(err);
                    return done(err);
                }
                console.log('user fb', user.google.displayName );
                console.log('user fb tokens',user.google.token);
                return done(null, user);
            });
        }
   
 }
);