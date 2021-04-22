const express = require('express');
const router = express.Router();
const passport = require('passport');

// @route    POST api/user/signin
// @desc     User Signin
// @access   Private
router.post('/signin', passport.authenticate('google'), (req, res) => {});

// @route    POST api/user/signin
// @desc     User login
// @access   Private
router.post('/login', (req, res) => {});

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
  res.send(req.user);
});

module.exports = router;
