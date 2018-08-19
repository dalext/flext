import React from "react";
import ReactDom from "react-dom";
import ContentWrapper from "../Layout/ContentWrapper";
import { Grid, Row, Col, Dropdown, MenuItem, Tabs, Tab } from "react-bootstrap";
// header
import SubHeaderHome from "../Layout/SubHeaderHome";
import HeaderHome from "../Layout/HeaderHome";
// charts
import RickHomeChart from "./RickHomeChart";
import RickHomeChartRun from "./RickHomeChart.run";
// charts data
import HomeRun from "./Home.run";
//transitions
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Home extends React.Component {
  componentDidMount() {
    HomeRun(ReactDom.findDOMNode(this.refs.chartSpline));
    RickHomeChartRun();
    $("body").addClass("layout-h");
  }

  componentWillUnmount() {
    $(this.refs.chartSpline).data("plot").shutdown();
  }

  render() {
    const animationName = "rag-fadeIn";
    return (
      <div>
        <HeaderHome />
        {/* START widgets box*/}
        <div className="container">
          <Row>
            <Col lg={3} sm={6}>
              {/* START widget*/}
              <RickHomeChart
                identifier="rickshaw1"
                title="45,931"
                subtitle="PUBLICATIONS"
                icon="icon-layers"
              />
              {/* END widget*/}
            </Col>
            <Col lg={3} sm={6}>
              {/* START widget*/}
              <RickHomeChart
                identifier="rickshaw2"
                title="DOWNLOADS"
                subtitle="HOURLY"
                icon="icon-cloud-download"
              />
              {/* END widget*/}
            </Col>
            <Col lg={3} md={6} sm={12}>
              {/* START widget*/}
              <RickHomeChart
                identifier="rickshaw3"
                title="761"
                subtitle="NEW TEAMS"
                icon="icon-people"
              />
              {/* END widget*/}
            </Col>
            <Col lg={3} md={6} sm={12}>
              {/* START widget*/}
              <RickHomeChart
                identifier="rickshaw4"
                title="3,518"
                subtitle="CONCURRENT USERS"
                icon="icon-organization"
              />
              {/* END widget*/}
            </Col>
          </Row>
          {/* START chart*/}
          <Row>
            <Col lg={12}>
              {/* START widget*/}
              <div id="panelChart9" className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title">
                    New publications <em>(hourly)</em>
                  </div>
                </div>
                <div className="panel-wrapper">
                  <div className="panel-body">
                    <div
                      ref="chartSpline"
                      className="chart-splinev3 flot-chart"
                    />
                  </div>
                </div>
              </div>
              {/* END widget*/}
            </Col>
          </Row>
        </div>
        {/* END widgets box*/}
        <SubHeaderHome />
      </div>
    );
  }
}

export default Home;
