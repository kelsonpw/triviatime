const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const {
      original,
      userResponse: { username, answer }
    } = req.body;
    const { question, correct_answer } = original;
    const isValid = answer === correct_answer;
    let increaseCorrect = 0;
    if (isValid) increaseCorrect = 1;
    const newResponse = {
      responseQuestion: question,
      responseAnswer: answer,
      correctAnswer: correct_answer,
      responseCorrect: isValid
    };
    const user = await User.findOneAndUpdate(
      { username },
      {
        $push: { responses: newResponse },
        $inc: { correctAnswers: increaseCorrect }
      },
      { new: true }
    );
    return res.json({ isValid, correctCount: user.correctAnswers });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
