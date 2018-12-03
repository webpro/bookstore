import { Component, Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import authenticateUserMutation from './authenticateUserMutation.gql';
import { initializeFacebookSDK, doFacebookLogin } from '../../lib/facebook';
import { GRAPHCOOL_TOKEN } from '../../constants';

class Login extends Component {
  state = {
    anchorEl: null
  };

  componentDidMount() {
    initializeFacebookSDK();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleFacebook = () => {
    doFacebookLogin(async response => {
      if (response.status === 'connected') {
        const facebookToken = response.authResponse.accessToken;
        const graphcoolResponse = await this.props.authenticateFacebookUser({ variables: { facebookToken } });
        const graphcoolToken = graphcoolResponse.data.authenticateUser.token;
        localStorage.setItem(GRAPHCOOL_TOKEN, graphcoolToken);
        this.handleClose();
        window.location.reload();
      } else {
        console.warn(`User did not authorize the Facebook application.`);
      }
    });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <Fragment>
        <Button onClick={this.handleClick} color="inherit">
          Login with...
        </Button>
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuItem onClick={this.handleFacebook}>Facebook</MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

export default compose(graphql(authenticateUserMutation, { name: 'authenticateFacebookUser' }))(Login);
