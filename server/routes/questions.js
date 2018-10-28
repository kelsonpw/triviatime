const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const { original, userResponse } = req.body;
    const { question, correct_answer } = original;
    const isValid = userResponse.answer === correct_answer;
    let increaseCorrect = 0;
    if (isValid) increaseCorrect = 1;
    const newResponse = {
      responseQuestion: question,
      responseAnswer: userResponse.answer,
      responseCorrect: isValid
    };
    const user = await User.findOneAndUpdate(
      { username: userResponse.username },
      {
        $push: { responses: newResponse },
        $inc: { correctAnswers: increaseCorrect }
      },
      { new: true }
    );
    return res.json({ isValid });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
