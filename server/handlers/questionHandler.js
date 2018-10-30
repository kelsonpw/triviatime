// these helpers abstract the complex logic of the database queries as well as type checking
const {
  createResponseIfNew,
  addToResponses
} = require('../helpers/questionHelpers');

const postQuestionToUser = async (req, res, next) => {
  // IF ANSWER HAS NOT BEEN ANSWERED: generate response object, add to user model instance,
  // and increase if answer is correct, otherwise do not handle duplicates
  try {
    const {
      isNew,
      newResponse,
      increaseCorrectValue,
      username
    } = await createResponseIfNew(req.body);
    if (isNew) {
      const usersCorrectAnswers = await addToResponses(
        username,
        newResponse,
        increaseCorrectValue
      );
      return res.json({
        isValid: newResponse.responseCorrect,
        correctCount: usersCorrectAnswers
      });
    }
    return next(new Error(`Duplicate question`));
  } catch (err) {
    return next(err);
  }
};

module.exports = postQuestionToUser;
