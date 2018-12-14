const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, default: 'user' },
  created: { type: Date },
  updated: { type: Date },
  
  //infor user login on facebook
  facebook: {
    id: String,
    token: String,
    displayName: String,
    email: String,
  },

  //infor user login on google
  google:{
    id: String,
    token: String,
    displayName: String,
    email: String,
  }
});

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }
      user.password = hash;
      return next();
    });

  });

});

const User = mongoose.model('user', UserSchema);
module.exports = User;