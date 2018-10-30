const mongoose = require('mongoose');
// Database config
const MLAB_URI = `mongodb://triviatime:trivia123@ds133582.mlab.com:33582/triviatime`;

// connnect to mongodb on mlab and set params
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose
  .connect(
    MLAB_URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log(`Mongo connection issue: ${err}`));

exports.User = require('./User');
