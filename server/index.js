const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// Setup middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Serves the static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
const userRoutes = require('./routes/users');
const questionRoutes = require('./routes/questions');
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
      error: err.message
    });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log(`App is listening on ${PORT}`);
