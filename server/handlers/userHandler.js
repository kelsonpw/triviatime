const { User } = require('../models');

// handles signin/login requests
const signInOrLogin = async (req, res, next) => {
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
};

// handles get requests for user model
const getCurrentUser = async (req, res, next) => {
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
};

module.exports = { signInOrLogin, getCurrentUser };
