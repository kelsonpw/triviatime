import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '50px',
    width: '50%'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '200px',
    textAlign: 'center'
  },
  question: {
    marginBottom: '25px',
    fontWeight: '500'
  },
  button: {
    marginBottom: '15px',
    padding: '15px 30px'
  }
};

class QuestionCards extends Component {
  render() {
    const {
      classes,
      newQuestion: { question, choices }
    } = this.props;

    return (
      <Grid className={classes.container}>
        <Card className={classes.card}>
          <Typography className={classes.question} variant="h5">
            {question}
          </Typography>
          {choices.map((choice, index) => (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={evt => this.props.handleAnswer(evt, choice)}
              key={index}
            >
              {choice}
            </Button>
          ))}
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(QuestionCards);
