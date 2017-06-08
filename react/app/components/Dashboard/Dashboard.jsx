import React from "react";
import ReactDom from "react-dom";
import ContentWrapper from "../Layout/ContentWrapper";
import RickHomeChart from "../Home/RickHomeChart";
import {
  Grid,
  Row,
  Col,
  Dropdown,
  MenuItem,
  Tabs,
  Tab,
  Button
} from "react-bootstrap";
import DashboardRun from "./Dashboard.run";
import SubHeaderHome from "../Layout/SubHeaderHome";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docs: []
    };
  }
  componentDidMount() {
    DashboardRun(ReactDom.findDOMNode(this.refs.chartSpline));
  }

  componentWillUnmount() {
    $(this.refs.chartSpline).data("plot").shutdown();
  }

  render() {
    return (
      <ContentWrapper>
        <div className="container">
          <Row>
            <Col lg={8} sm={8}>
              <h1 className="text-uppercase">Your stats</h1>
            </Col>
            <Col lg={4} sm={4}>
              <Button
                id="newDocModal"
                bsSize="large"
                bsStyle="success"
                className="pull-right big-button"
              >
                <span className="icon-plus big-plus" />
              </Button>
            </Col>
          </Row>
        </div>
        {/* START widgets box*/}
        <div className="container">
          <Row>
            <Col lg={3} sm={6}>
              {/* START widget*/}
              <RickHomeChart
                identifier="rickshaw1"
                title="23"
                subtitle="Editor instances"
                icon="icon-layers"
              />
              {/* END widget*/}
            </Col>
            <Col lg={3} sm={6}>
              {/* START widget*/}
              <RickHomeChart
                identifier="rickshaw2"
                title="129,310"
                subtitle="views"
                icon="icon-cloud-download"
              />
              {/* END widget*/}
            </Col>
            <Col lg={3} md={6} sm={12}>
              {/* START widget*/}
              <RickHomeChart
                identifier="rickshaw3"
                title="12"
                subtitle="publications"
                icon="icon-people"
              />
              {/* END widget*/}
            </Col>
            <Col lg={3} md={6} sm={12}>
              {/* START widget*/}
              <RickHomeChart
                identifier="rickshaw4"
                title="3"
                subtitle="teams"
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
                    Views/Day
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
      </ContentWrapper>
    );
  }
}

export default Dashboard;
