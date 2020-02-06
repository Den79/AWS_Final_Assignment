import React, { Component } from "react";
import { Auth } from "aws-amplify";

export default class Logout extends Component {
  //handle the logout button click event
  //logOutHandler

  componentDidMount() {
    try {
      Auth.signOut();
      this.props.auth.authenticateUser(false);
      this.props.auth.setAuthUser(null);
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <div>
        <br />
        <h1 className="center">Good buy!</h1>
      </div>
    );
  }
}
