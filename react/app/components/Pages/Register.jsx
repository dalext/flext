import React from "react";
import ReactDOM from "react-dom";
import { Grid, Row, Col, Panel, Button } from "react-bootstrap";
import { Router, Route, Link, History } from "react-router";

class Register extends React.Component {
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
      fetch(SERVER_ADDR + "/register", {
        method: "POST",
        body: formData
      }).then(result => {
        result.text().then(text => {
          if (text.length < 50) {
            // email taken
            alert(text);
          } else {
            let date = new Date();
            date.setTime(date.getTime() + 100 * 24 * 60 * 60 * 1000);
            // set cookie
            document.cookie = [
              "science={access_token: " + text + " }",
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
            <p className="text-center pv">SIGNUP TO GET INSTANT ACCESS</p>
            <form
              ref={form => {
                this.form = form;
              }}
              data-parsley-validate=""
              onSubmit={this.handleSubmit}
              id="register-form"
              noValidate
              className="mb-lg"
            >
              <div className="form-group has-feedback">
                <label htmlFor="signupInputEmail1" className="text-muted">
                  Email address
                </label>
                <input
                  onChange={this.handleEmail}
                  id="signupInputEmail1"
                  type="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  required="required"
                  className="form-control"
                />
                <span className="fa fa-envelope form-control-feedback text-muted" />
              </div>
              <div className="form-group has-feedback">
                <label htmlFor="signupInputPassword1" className="text-muted">
                  Password
                </label>
                <input
                  onChange={this.handlePassword}
                  id="signupInputPassword1"
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  required="required"
                  className="form-control"
                />
                <span className="fa fa-lock form-control-feedback text-muted" />
              </div>
              <div className="form-group has-feedback">
                <label htmlFor="signupInputRePassword1" className="text-muted">
                  Retype Password
                </label>
                <input
                  id="signupInputRePassword1"
                  type="password"
                  placeholder="Retype Password"
                  autoComplete="off"
                  required="required"
                  data-parsley-equalto="#signupInputPassword1"
                  className="form-control"
                />
                <span className="fa fa-lock form-control-feedback text-muted" />
              </div>
              <div className="clearfix">
                <div className="checkbox c-checkbox pull-left mt0">
                  <label>
                    <input
                      type="checkbox"
                      value=""
                      required="required"
                      name="agreed"
                    />
                    <em className="fa fa-check" />
                    I agree with the
                    {" "}
                    <a href="#">terms</a>
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-block btn-primary mt-lg">
                Create account
              </button>
            </form>
            <p className="pt-lg text-center">Have an account?</p>
            <Link to="login" className="btn btn-block btn-default">
              Signup
            </Link>
          </div>
        </div>
        {/* END panel */}
      </div>
    );
  }
}

export default Register;
