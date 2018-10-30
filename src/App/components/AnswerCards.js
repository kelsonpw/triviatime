import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    height: '100px',
    padding: '30px',
    margin: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '700px'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

class AnswerCards extends Component {
  renderResponses() {
    const { responses, classes } = this.props;
    return responses.map((res, index) => (
      <Card className={classes.card} key={index}>
        <Typography gutterBottom variant="h5" component="h2">
          {res.responseQuestion}
        </Typography>
        <Typography component="p">Your answer: {res.responseAnswer}</Typography>
        <Typography component="p">
          Correct answer: {res.correctAnswer}
        </Typography>
        <Typography component="p">
          Result: {res.responseCorrect ? 'Correct' : 'Incorrect'}{' '}
        </Typography>
      </Card>
    ));
  }

  render() {
    return (
      <div className={this.props.classes.container}>
        {this.renderResponses()}
      </div>
    );
  }
}

export default withStyles(styles)(AnswerCards);
