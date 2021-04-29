/* -------------------------------------------- imports for the route---------------------------------------------------- */

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const AuthCheck = require('../middleware/Auth');
const { calBMI, calBMR, calorate } = require('../functions/index');

// @route    GET api/func/calc
// @desc     returns JSON with all the necessary calculations
// @access   Private

router.get('/calc', AuthCheck, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const calcBMI = calBMI(user.toJSON());
    const calcBMR = calBMR(user.toJSON());
    const cal = calorate(user.toJSON());

    res.json({
      auth: 'authenticated',
      bmi: calcBMI.bmi,
      category: calcBMI.category,
      bmr: calcBMR,
      calorie: cal * calcBMR,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'internal server error' });
  }
});

router.post('/update', async (req, res) => {
  try {
    await User.findOneAndUpdate(req.user.id, req.body, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: 'internal server error' });
      } else {
        res.send('successfull');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'internal server error' });
  }
});

module.exports = router;
