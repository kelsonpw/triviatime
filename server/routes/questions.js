const express = require('express');
const router = express.Router();
const postQuestionToUser = require('../handlers/questionHandler.js');

// these helpers abstract the complex logic of the database queries as well as type checking
router.post('/', postQuestionToUser);

module.exports = router;
