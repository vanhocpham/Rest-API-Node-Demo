const jwt = require ('jsonwebtoken');
const PassportFacebookStrategy = require('passport-facebook').Strategy;
const config = require ('../../config');
const User = require ('../models/user');


/**
 * Return the Passport Facebook Strategy object.
 */

 module.exports = new PassportFacebookStrategy({
        clientID: config.FACEBOOK_APP_ID,
        clientSecret: config.FACEBOOK_APP_SECRET,
        callbackURL:"http://localhost:8818/api/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'emails'],
        passReqToCallback : true
     },
     (accessToken, refreshToken, profile, done) => {
         console.log(profile);
         
            if(!req.user) {//confirm that user not loggedin
                User.findOne ({'facebook.id': profile._json.id}), (err, user)=>{
                    if (err) { return done(err); }

                    if (user) {
                        return done(null, user);
                    }
                    else{
                        const newUser = new User();
                        newUser.facebook.id = profile._json.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.displayName = profile._json.displayName;
                        newUser.facebook.email =  profile._json.emails[0].value;

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
                user.facebook.id = profile._json.id;
                user.facebook.token = accessToken;
                user.facebook.displayName = profile._json.displayName;
                user.facebook.email =  profile._json.emails[0].value;

                // save modifications to user
                user.save(function(err) {
                    if (err) {
                        console.error(err);
                        return done(err);
                    }
                    console.log('user fb', user.facebook.displayName );
                    console.log('user fb tokens',user.facebook.token);
                    return done(null, user);
                });
            }
        
     }
 );