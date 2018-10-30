const express = require('express');
const router = express.Router();

const { signInOrLogin, getCurrentUser } = require('../handlers/userHandler');

// if user is new create user, otherwise return the created user.  basically handles login and signup in same route
router.post('/account', signInOrLogin);

// used to grabbing the most current user data
router.get('/:username', getCurrentUser);

module.exports = router;
