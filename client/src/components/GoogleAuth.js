import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount () {
    window.gapi.load ('client:auth2', () => {
      window.gapi.client
        .init ({
          clientId: '610489510847-8rie883bd3rf8hl18cieb8sr6ur4ig7f.apps.googleusercontent.com',
          scope: 'email',
        })
        .then (() => {
          this.auth = window.gapi.auth2.getAuthInstance ();
          // this.setState ({isSignedIn: this.auth.isSignedIn.get ()});
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen (this.onAuthChange);
        });
    });
  }

  onSignInClick = () => {
    this.auth.signIn ();
  };

  onSignOutClick = () => {
    this.auth.signOut ();
  };

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn (this.auth.currentUser.get ().getId ());
    } else {
      this.props.signOut ();
    }
  };

  renderAuthButton () {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />Sign In with Google
        </button>
      );
    }
  }
  render () {
    return <div>{this.renderAuthButton ()}</div>;
  }
}


const mapStateToProps = (state)=>{
  return {isSignedIn: state.auth.isSignedIn}
}
export default connect (mapStateToProps, {signIn, signOut}) (GoogleAuth);

//gapi.auth2.getAuthInstance ().signOut ();
//gapi.auth2.getAuthInstance ().currentUser.get ().getId ();

//https://developers.google.com/identity/sign-in/web/reference#authentication
//https://developers.google.com/identity/protocols/oauth2/scopes
//https://github.com/zalmoxisus/redux-devtools-extension
//https://console.developers.google.com/apis/credentials?project=streamy-281411
