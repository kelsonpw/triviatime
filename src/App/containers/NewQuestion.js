import React, { Component } from 'react';
import QuestionCards from '../components/QuestionCard';
import { connect } from 'react-redux';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Snackbar from '@material-ui/core/Snackbar';
import { shuffle } from '../Helpers';
import Typography from '@material-ui/core/Typography';
import theme from '../theme';
const styles = {
  loadingCard: {
    marginTop: '25%',
    display: 'flex',
    justifyContent: 'center',
    padding: '15px 40px',
    width: '200px'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column'
  },
  snackbarAlert: {
    marginTop: '80px',
    textAlign: 'center',
    minWidth: '100px',
    maxWidth: '330px'
  },
  snackBarContainer: {
    marginLeft: '50px'
  }
};

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      valid: null,
      question: null,
      error: false,
      openAlert: false,
      correctCount: null
    };
  }

  async componentDidMount() {
    await this.getQuestion();
  }

  async getQuestion() {
    this.setState({ loading: true, error: false });
    try {
      const apiRes = await axios.get(
        'https://opentdb.com/api.php?amount=1&encode=url3986'
      );

      const question = apiRes.data.results[0];
      const decodedQuestion = {};
      for (let key in question) {
        if (Array.isArray(question[key])) {
          decodedQuestion[key] = question[key].map(val =>
            decodeURIComponent(val)
          );
        } else {
          decodedQuestion[key] = decodeURIComponent(question[key]);
        }
      }
      const { correct_answer, incorrect_answers } = decodedQuestion;
      let possibleChoices = [...incorrect_answers, correct_answer];
      decodedQuestion.choices = shuffle(possibleChoices);
      this.setState({
        question: decodedQuestion,
        loading: false,
        error: false
      });
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  }

  handleAnswer = async (evt, answer) => {
    evt.preventDefault();
    try {
      const original = this.state.question;
      const { username } = this.props.user;
      const userResponse = {
        answer,
        username
      };
      let result = await axios.post('http://localhost:5000/questions', {
        original,
        userResponse
      });
      const { isValid, correctCount } = result.data;
      this.getQuestion();
      this.setState({
        openAlert: true,
        isValid,
        correctCount
      });
      setTimeout(() => this.setState({ openAlert: false }), 3000);
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  isLoaded(classes) {
    if (this.props.user) {
      if (this.state.question) {
        return (
          <div>
            <QuestionCards
              newQuestion={this.state.question}
              handleAnswer={this.handleAnswer}
            />
          </div>
        );
      } else {
        return (
          <Card className={classes.loadingCard}>
            <Typography component="p">Loading...</Typography>
          </Card>
        );
      }
    } else {
      return (
        <Card className={classes.loadingCard}>
          <Typography component="p">Please login first</Typography>
        </Card>
      );
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {this.isLoaded(classes)}
        <Snackbar
          open={this.state.openAlert}
          className={classes.snackbarAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message={
            <div className={classes.snackBarContainer}>
              <Typography component="p" color="inherit">
                Your answer was{' '}
                {this.state.isValid ? 'correct. Nice!' : 'incorrect.'}
                <br />
                Your score is {this.state.correctCount}
              </Typography>
            </div>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.auth };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(NewQuestion));
