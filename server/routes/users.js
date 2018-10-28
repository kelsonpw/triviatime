const express = require('express');
const router = express.Router();

const { User } = require('../models');

router.post('/account', async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.json(user);
    } else {
      const newUser = await new User({
        username
      }).save();
      return res.json(newUser);
    }
  } catch (err) {
    return next(err);
  }
});

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (user) {
      return res.json(user);
    } else {
      return next(new Error('User does not exist'));
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
