const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// @route    POST api/user/signin
// @desc     User Signin
// @access   Private
router.post('/signup', async (req, res, next) => {
  try {
    if (req.user) {
      //TODO:revert back to !req.user for the brower
      const user = await new User({
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password,
      });

      const newUser = await user.save();
      if (newUser) {
        res.status(200).json(newUser);
      } else {
        throw new Error('user could not be registered');
      }
    } else {
      res.send('meow');
    }
  } catch (err) {
    console.error(err);
    if (err.name === 'MongoError' && err.code === 11000) {
      res.status(500).json({ message: 'signin with google' });
    } else {
      res.status(500).json({ message: 'internal server error' });
    }
  }
});

// @route    POST api/user/signin
// @desc     User login
// @access   Private
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/lmao', //TODO:proper redirects on events to be handled
    failureRedirect: '/lol',
    session: true,
  })
);

// @route    GET api/user/google
// @desc     User google signin
// @access   Private
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
  (req, res) => {
    console.log(req.body);
  }
);

// @route    GET api/user/google/redirect
// @desc     redirect(callback)
// @access   Private
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log(req);
  res.redirect('http://localhost:3000/form');
});

module.exports = router;
