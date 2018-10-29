import React, { Component } from 'react';
import AnswerCards from '../components/AnswerCards';
import { getUserAction } from '../../authActions';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '40px'
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px 40px'
  },
  loadingCard: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px 40px',
    width: '200px'
  }
};

class AnswerHistory extends Component {
  async componentDidMount() {
    if (this.props.user) this.props.getUserAction(this.props.user.username);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {!this.props.loading && this.props.user ? (
          <div className={classes.container}>
            <Card className={classes.card}>
              <Typography component="h1" variant="title">
                Current Score:
                {' ' + this.props.user.correctAnswers}
              </Typography>
            </Card>
            <AnswerCards responses={this.props.user.responses} />
          </div>
        ) : (
          <Card className={classes.loadingCard}>
            <Typography component="p">Loading...</Typography>
          </Card>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth });

export default connect(
  mapStateToProps,
  { getUserAction }
)(withStyles(styles)(AnswerHistory));
