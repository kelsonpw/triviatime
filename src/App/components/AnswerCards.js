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
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
};

class AnswerCards extends Component {
  renderResponses() {
    const { responses, classes } = this.props;
    return responses.map((res, index) => (
      <Card className={classes.card} flex justify="center" key={index}>
        <Typography gutterBottom variant="h5" component="h2">
          {atob(res.responseQuestion)}
        </Typography>
        <Typography component="p">
          Your answer: {atob(res.responseAnswer)}
        </Typography>
        <Typography component="p">
          Result: {res.responseCorrect ? 'Correct' : 'Incorrect'}{' '}
        </Typography>
      </Card>
    ));
  }

  render() {
    return <div className="container">{this.renderResponses()}</div>;
  }
}

export default withStyles(styles)(AnswerCards);
