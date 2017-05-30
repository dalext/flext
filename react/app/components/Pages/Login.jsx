import React from "react";
import { Grid, Row, Col, Panel, Button } from "react-bootstrap";
import { Router, Route, Link, History } from "react-router";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  handleEmail(event) {
    this.setState({ email: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit() {
    // set app to loading
    this.setState({ loading: true });
    // construct post data
    var formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    // make request
    fetch("http://52.58.76.202:5555/login", {
      method: "POST",
      body: formData
    }).then(result => {
      // timeout of 4 seconds for testing purposes
      setTimeout(() => {
        result.text().then(text => {
          localStorage.setItem("access_token", text);
          this.props.router.push("/");
        });
      }, 1e3); // 1 secon
    });
  }
  render() {
    if (this.state.loading) {
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
              <p className="text-center pv">PROCESSING TRANSACTION...</p>
              <div className="jumbotron">
                <div className="panel-body whirl duo" />
              </div>
            </div>
          </div>
          {/* END panel */}
        </div>
      );
    } else {
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
                onSubmit={this.handleSubmit}
                role="form"
                data-parsley-validate=""
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
                <button
                  type="submit"
                  className="btn btn-block btn-primary mt-lg"
                >
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
}

export default Login;
