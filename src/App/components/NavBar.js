import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

class NavBar extends PureComponent {
  handleLogout = () => {
    localStorage.clear();
    this.props.history.go('/');
  };

  navLinks = () => {
    if (this.props.auth && this.props.auth.user) {
      return [
        <StyledNavLink to="/question" key={0}>
          <Button color="inherit">New Question</Button>
        </StyledNavLink>,
        <StyledNavLink to="/history" key={1}>
          <Button color="inherit">History</Button>
        </StyledNavLink>,
        <Button color="inherit" onClick={this.handleLogout} key={2}>
          Logout
        </Button>
      ];
    }
    return (
      <StyledNavLink to="/signin">
        <Button color="inherit">Login</Button>
      </StyledNavLink>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <StyledNavLink to="/">TriviaTime</StyledNavLink>
            </Typography>
            {this.navLinks()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
