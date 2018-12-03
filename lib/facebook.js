import { FACEBOOK_APP_ID, FACEBOOK_API_VERSION } from '../constants';

export const initializeFacebookSDK = () => {
  window.fbAsyncInit = () => {
    FB.init({
      appId: FACEBOOK_APP_ID,
      cookie: true,
      xfbml: true,
      version: FACEBOOK_API_VERSION
    });
  };

  (function(d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};

export const doFacebookLogin = callback => {
  FB.login(callback, { scope: 'public_profile,email' });
};
