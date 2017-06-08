import React from "react";
import ReactDOM from "react-dom";
import { Grid, Row, Col, Panel, Button } from "react-bootstrap";
import { Router, Route, Link, History } from "react-router";

import Cookies from "universal-cookie";
const cookies = new Cookies();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmail(event) {
    this.setState({ email: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let instance = $(ReactDOM.findDOMNode(this.form)).parsley();
    if (instance.isValid()) {
      // construct post data
      var formData = new FormData();
      formData.append("email", this.state.email);
      formData.append("password", this.state.password);
      // make request
      fetch(SERVER_ADDR + "/login", {
        method: "POST",
        body: formData
      }).then(result => {
        result.json().then(result => {
          if (result.error) {
            alert(result.error); // wrong password or email not found
          } else {
            let date = new Date();
            date.setTime(date.getTime() + 100 * 24 * 60 * 60 * 1000);
            // set cookie
            let cookieVal = {
              access_token: result.access_token,
              id: btoa(this.state.email) // using hashed email as id
            };
            // set cookie
            document.cookie = [
              "science=" + JSON.stringify(cookieVal),
              "; expires=" + date.toUTCString(),
              "; path=/",
              "; domain=" + SERVER_DOMAIN
            ].join("");
            document.location =
              "http://" + SERVER_DOMAIN + ":" + SERVER_PORT + "/dashboard";
          }
        });
      });
    }
  }
  render() {
    return (
      <div className="block-center mt-xl wd-xl">
        {/* START panel */}
        <div className="panel panel-dark panel-flat">
          <div className="panel-heading text-center">
            <a href="#">
              <img
                src="img/science1.png"
                alt="Image"
                className="block-center img-rounded"
              />
            </a>
          </div>
          <div className="panel-body">
            <p className="text-center pv">SIGN IN TO CONTINUE.</p>
            <form
              ref={form => {
                this.form = form;
              }}
              data-parsley-validate=""
              onSubmit={this.handleSubmit}
              id="login-form"
              noValidate
              className="mb-lg"
            >
              <div className="form-group has-feedback">
                <input
                  onChange={this.handleEmail}
                  id="exampleInputEmail1"
                  type="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  required="required"
                  className="form-control"
                />
                <span className="fa fa-envelope form-control-feedback text-muted" />
              </div>
              <div className="form-group has-feedback">
                <input
                  onChange={this.handlePassword}
                  id="exampleInputPassword1"
                  type="password"
                  placeholder="Password"
                  required="required"
                  className="form-control"
                />
                <span className="fa fa-lock form-control-feedback text-muted" />
              </div>
              <div className="clearfix">
                <div className="checkbox c-checkbox pull-left mt0">
                  <label>
                    <input type="checkbox" value="" name="remember" />
                    <em className="fa fa-check" />Remember Me
                  </label>
                </div>
                <div className="pull-right">
                  <Link to="recover" className="text-muted">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <button type="submit" className="btn btn-block btn-primary mt-lg">
                Login
              </button>
            </form>
            <p className="pt-lg text-center">Need to Signup?</p>
            <Link to="register" className="btn btn-block btn-default">
              Register Now
            </Link>
          </div>
        </div>
        {/* END panel */}
      </div>
    );
  }
}

export default Login;
