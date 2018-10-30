const { User } = require('../models');

// check if question exists in user response array
const checkIfNewQuestion = async (username, question) => {
  const userHasAnswered = await User.findOne(
    { username },
    {
      responses: {
        $elemMatch: {
          responseQuestion: question
        }
      }
    }
  );
  return userHasAnswered.responses.length === 0;
};

// if answer is correct increase by 1, otherwise do not increase
const answerIncreaseIfCorrect = (answer, correctAnswer) => {
  return answer === correctAnswer ? 1 : 0;
};

// add response to user, and return how many correct questions they have (int)
const addToResponses = async (username, newResponse, increaseCorrect) => {
  const user = await User.findOneAndUpdate(
    { username },
    {
      $push: { responses: newResponse },
      $inc: { correctAnswers: increaseCorrect }
    },
    { new: true }
  );
  return user.correctAnswers;
};

// if route found that the question is new, this function handles the adding of the question
// to the users response array, as well as increasing their correct score
const createResponseIfNew = async data => {
  console.log('crif', data);
  const {
    original: { question, correct_answer },
    userResponse: { username, answer }
  } = data;
  const isNew = await checkIfNewQuestion(username, question);
  const increaseCorrectValue = answerIncreaseIfCorrect(answer, correct_answer);
  const isValid = !!increaseCorrectValue;
  return {
    isNew,
    increaseCorrectValue,
    username,
    newResponse: {
      responseQuestion: question,
      responseAnswer: answer,
      correctAnswer: correct_answer,
      responseCorrect: isValid
    }
  };
};

module.exports = { createResponseIfNew, addToResponses };
