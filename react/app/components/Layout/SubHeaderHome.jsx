import React from "react";
import { Col } from "react-bootstrap";
class SubHeaderHome extends React.Component {
  render() {
    return (
      <div
        className="intro-header header-home"
        style={{ backgroundImage: "url(" + "/img/data2.jpg" + ")" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-offset-1 col-md-offset-1 col-md-10">
              <div className="site-heading">
                <h1>Participation in over 100 countries</h1>
                <span className="header-subheading">
                  {" "}The largest scientific research network in the world
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubHeaderHome;
