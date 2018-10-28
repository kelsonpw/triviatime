import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import NavBar from './components/NavBar';
import Signin from './containers/Signin';
import NewQuestion from './containers/NewQuestion';
import AnswerHistory from './containers/AnswerHistory';
import { connect } from 'react-redux';
import { getUserAction } from '../authActions';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  app: {
    backgroundColor: '#3F51B5',
    height: '100vh',
    overflow: 'auto'
  }
});

class App extends Component {
  componentDidMount() {
    const username = localStorage.getItem('username');
    if (username) {
      this.props.getUserAction(username);
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className={classes.app}>
            <Route
              path="/"
              render={props => <NavBar {...props} auth={this.props.auth} />}
            />
            <Route
              exact
              path="/"
              render={() =>
                !!this.props.auth.user ? (
                  <Redirect to="/question" />
                ) : (
                  <Redirect to="signin" />
                )
              }
            />
            <Route
              path="/signin"
              render={props => (
                <Signin authed={!!this.props.auth.user} {...props} />
              )}
            />
            <PrivateRoute
              authed={!!this.props.auth.user}
              path="/question"
              component={NewQuestion}
            />
            <PrivateRoute
              authed={!!this.props.auth.user}
              path="/history"
              component={AnswerHistory}
            />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  { getUserAction }
)(withStyles(styles)(App));
