const express = require('express');
const passport = require('passport');
const facebookLoginStrategy = require('../passport/login-facebook');
const user = require('../controllers/user');

const googleLoginStrategy = require('../passport/login-google');


const authCheckMiddleware = require('../middleware/auth-check');

passport.use('google-login', googleLoginStrategy);
passport.use('facebook-login', facebookLoginStrategy)
const router = express.Router();

router.post('/login/local', user.login.manual);

router.get('/login/fb', user.login.facebook);

router.get('/login/facebook/callback', passport.authenticate('facebook-login', { successRedirect: '/',
failureRedirect: '/login' }));

router.get('/login/google', passport.authenticate('google-login',{scope:['profile']}));

router.get('login/google/callback', passport.authenticate('google-login'), (req,res)=>{
    res.send('you reached call back uri');
});

router.post('/register', user.register);

router.get('/user', authCheckMiddleware, user.getAll)


router.get ('/google', passport.authenticate('google-login',{
    scope:['profile']
}))

module.exports = router;