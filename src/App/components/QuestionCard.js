import React, { PureComponent } from 'react';
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
    width: '400px',
    minHeight: '300px'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '30%',
    textAlign: 'center'
  },
  question: {
    marginBottom: '40px',
    fontWeight: '500'
  },
  button: {
    margin: '5px',
    padding: '15px 40px'
  }
};

class QuestionCards extends PureComponent {
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
              color="secondary"
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
