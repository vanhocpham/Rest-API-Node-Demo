const mongoose = require('mongoose');
const passport = require('passport');
const localLoginStrategy = require('../passport/login-passport');
const facebookLoginStrategy = require('../passport/login-facebook');
const googleLoginStrategy = require('../passport/login-google');

passport.use('local-login', localLoginStrategy);
passport.use('facebook-login', facebookLoginStrategy);
passport.use('google-login', googleLoginStrategy);

const User = require('../models/user');

module.exports = {

    //Login using on passport-local, passport-facebook, passport-google 
    login:{
        manual: (req, res, next) => {
            return passport.authenticate('local-login', (err, token, data) => {
                if (err) {
                    return res.status(403).json(err);
                }
                return res.json({
                    token,
                    data
                });
            })(req, res, next);
        },
        facebook: (req,res, next) => {
            return passport.authenticate('facebook-login', (err, user) => {
                if (err) {
                    return res.status(403).json(err);
                }
                return res.json({
                    user
                });
            })(req, res, next);
        },
        google: ( req, res, next) => {
            return passport.authenticate('google-login', (err, user) => {
                if (err) {
                    return res.status(403).json(err);
                }
                return res.json(
                   user
                );
            })(req, res, next);
        },
    },

    register: (req, res, next) => {
        const { email, password } = req.body;
        const user = new User({ email, password });
        if (!email || !password) { throw new Error('You must provide an email and password.'); }
      
        return User.findOne({ email })
            .then(existingUser => {
                if (existingUser) {
                return res.status(403).json('Email in use');
                }
                user.save();
                return res.json({
                    message:"Register Successfully"
                });
            });
    },
    getAll: (req, res, next) => {
        User.find()
            .select('_id role email password')
            .exec()
            .then(docs => {
                console.log(docs);
                const response = {
                    count: docs.length,
                    users: docs.map(doc => {
                        return {
                            _id: doc._id,
                            role:doc.role,
                            email: doc.email,
                            password: doc.password,
                        }
                    })
    
                }
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }, 
}