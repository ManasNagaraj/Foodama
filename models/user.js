const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

userSchema = new mongoose.Schema({
  email: {
    type: String,
    //required: true,
    unique: true,
    dropDups: true,
  },
  password: {
    type: String,
    //required: true,
  },
  firstName: {
    type: String,
    // required: false,
  },

  middleName: {
    type: String,
    // required: false,
  },
  lastName: {
    type: String,
    // required: false,
  },

  contactNo: {
    type: String,
    //  required: false,
  },
  height: {
    type: Number,
    // required: false,
  },
  currentWeight: {
    type: Number,
    // required: false,
  },
  gender: {
    type: String,
  },

  targetWeight: {
    type: Number,
    // required: false,
  },
  activityLevel: {
    type: String,
    // required: false,
  },
  currentBMI: {
    type: Number,
  },
  googleId: String,
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.password) {
    next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;

  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

var User = mongoose.model('user', userSchema);

module.exports = User;
