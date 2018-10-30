const mongoose = require('mongoose');

// creates user schema.  has an array called responses
// that stores each instance of a question/answer for that user
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  responses: [
    {
      responseQuestion: {
        type: String,
        required: true
      },
      correctAnswer: {
        type: String,
        required: true
      },
      responseAnswer: {
        type: String,
        required: true
      },
      responseCorrect: {
        type: Boolean,
        required: true
      }
    }
  ]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
