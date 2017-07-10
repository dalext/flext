import React from "react";
import HeaderDefault from "./HeaderDefault";
import HeaderLoggedIn from "./HeaderLoggedIn";
import ContentWrapper from "./ContentWrapper";
import Offsidebar from "./Offsidebar";
import Footer from "./Footer";
import { Row, Col } from "react-bootstrap";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import Cookies from "universal-cookie";
const cookies = new Cookies();

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
  }
  componentWillMount() {
    $("body").addClass("layout-h");
    if (cookies.get("science")) {
      this.setState({ auth: true });
    }
  }

  render() {
    // Animations supported
    //      'rag-fadeIn'
    //      'rag-fadeInUp'
    //      'rag-fadeInDown'
    //      'rag-fadeInRight'
    //      'rag-fadeInLeft'
    //      'rag-fadeInUpBig'
    //      'rag-fadeInDownBig'
    //      'rag-fadeInRightBig'
    //      'rag-fadeInLeftBig'
    //      'rag-zoomBackDown'
    const animationName = "rag-fadeIn";

    return (
      <div className="wrapper">
        {!this.state.auth
          ? <HeaderDefault props={this.props} />
          : <HeaderLoggedIn props={this.props} />}
        <CSSTransitionGroup
          component="homepage"
          transitionName={animationName}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {React.cloneElement(this.props.children, {
            key: Math.random()
          })}
        </CSSTransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default Base;
