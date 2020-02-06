import React, { Component } from "react";
import { Auth } from "aws-amplify";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuth && this.props.auth.user && (
                <p>Hello {this.props.auth.user.username}</p>
              )}
              {!this.props.auth.isAuth && (
                <div className="auth-buttons">
                  <a href="/register" className="button is-primary">
                    <strong>Register</strong>
                  </a>
                  <a href="/login" className="button is-light">
                    Log in
                  </a>
                </div>
              )}
              {this.props.auth.isAuth && (
                <div>
                  {/* <a href="/changepassword" className="button is-light">
                  Change Password
                  </a> */}
                  <a
                    href="/logout"
                    //onClick={this.logOutHandler}
                    className="button is-light"
                  >
                    Log out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
