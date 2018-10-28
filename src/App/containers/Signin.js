import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInAction } from '../../authActions';
import Input from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    marginTop: '15%',
    display: 'flex',
    padding: '50px 30px',
    width: '400px',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  input: {
    backgroundColor: 'none',
    color: 'inherit',
    width: '275px'
  },
  heading: {
    marginBottom: '30px'
  },
  button: {
    marginTop: '50px',
    padding: '15px 30px'
  }
});

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  submitForm = async evt => {
    evt.preventDefault();
    await this.props.signInAction(
      { username: this.state.username },
      this.props.history
    );
    this.setState({ username: '' });
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  errorMessage() {
    if (this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { authed, classes } = this.props;
    if (authed) {
      return <Redirect to="/question" />;
    }
    return (
      <div className={classes.container}>
        <Grid container justify="center">
          <Card xs={6} className={classes.card}>
            <Typography variant="h3" component="h3" className={classes.heading}>
              TriviaTime
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Want to answer cool trivia questions?
            </Typography>
            <Typography component="p">
              Choose a username you will remember.
            </Typography>
            <Typography component="p">
              You can use the same username next time, and your answers will be
              stored.
            </Typography>
            <Input
              label="Username"
              name="username"
              className={classes.input}
              value={this.state.username}
              onChange={this.handleChange}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.submitForm}
            >
              I am ready
            </Button>
          </Card>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default connect(
  mapStateToProps,
  { signInAction }
)(withStyles(styles)(Signin));
