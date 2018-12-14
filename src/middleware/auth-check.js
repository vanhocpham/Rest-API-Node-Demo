const jwt    = require('jsonwebtoken');
const User = require('../models/user')
const config = require('../../config');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {

  // if (!req.headers.authorization) {
  //   return res.send({ error: true });
  // }

  // // get the last part from a authorization header string like "bearer token-value"
  // const token = req.headers.authorization.split(" ")[1];

  // // decode the token using a secret key-phrase
  // return jwt.verify(token, config.JwtSecret, (err, decoded) => {
  //   // the 401 code is for unauthorized status
  //   if (err) {
  //     return res.status(401).json({ message: 'Token not validate.' });
  //   }

  //   const userId = decoded.sub;

  //   // check if a user exists
  //   return User.findById(userId, (userErr, user) => {

  //     if (userErr || !user) {
  //       return res.status(401).end();
  //     }

  //     return next();
  //   });
  // });
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded =jwt.verify(token, config.JWT_SECRET);
    req.userData = decoded; 
    next();
  }catch(error){
    return res.status(401).json({
        message: 'Auth Failed'
    })
  }

};