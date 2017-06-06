import React from "react";
import ReactDom from "react-dom";
import ContentWrapper from "../Layout/ContentWrapper";
import { Grid, Row, Col, Dropdown, MenuItem, Tabs, Tab } from "react-bootstrap";
import DashboardRun from "./Dashboard.run";
import SubHeaderHome from "../Layout/SubHeaderHome";
class Dashboard extends React.Component {
  componentDidMount() {
    DashboardRun(ReactDom.findDOMNode(this.refs.chartSpline));
  }

  componentWillUnmount() {
    $(this.refs.chartSpline).data("plot").shutdown();
  }

  render() {
    return (
      <ContentWrapper>
        <h1 className="text-uppercase">Your stats</h1>
        {/* START widgets box*/}
        <Row>
          <Col lg={3} sm={6}>
            {/* START widget*/}
            <div className="panel bg-info-light pt b0 widget">
              <div className="ph">
                <em className="icon-cloud-upload fa-lg pull-right" />
                <div className="h2 mt0">23</div>
                <div className="text-uppercase">Editor instances</div>
              </div>
              <div
                data-sparkline=""
                data-type="line"
                data-width="100%"
                data-height="75px"
                data-line-color="#23b7e5"
                data-chart-range-min="0"
                data-fill-color="#23b7e5"
                data-spot-color="#23b7e5"
                data-min-spot-color="#23b7e5"
                data-max-spot-color="#23b7e5"
                data-highlight-spot-color="#23b7e5"
                data-highlight-line-color="#23b7e5"
                data-values="2,5,3,7,4,5"
                style={{ marginBottom: "-2px" }}
                data-resize="true"
              />
            </div>
          </Col>
          <Col lg={3} sm={6}>
            {/* START widget*/}
            <div className="panel widget bg-purple-light pt b0 widget">
              <div className="ph">
                <em className="icon-globe fa-lg pull-right" />
                <div className="h2 mt0">
                  3
                </div>
                <div className="text-uppercase">Teams</div>
              </div>
              <div
                data-sparkline=""
                data-type="line"
                data-width="100%"
                data-height="75px"
                data-line-color="#7266ba"
                data-chart-range-min="0"
                data-fill-color="#7266ba"
                data-spot-color="#7266ba"
                data-min-spot-color="#7266ba"
                data-max-spot-color="#7266ba"
                data-highlight-spot-color="#7266ba"
                data-highlight-line-color="#7266ba"
                data-values="5,4,8,4,8,7,10"
                style={{ marginBottom: "-2px" }}
                data-resize="true"
              />
            </div>
          </Col>
          <Col lg={3} md={6} sm={12}>
            {/* START widget*/}
            <div className="panel widget bg-info-light pt b0 widget">
              <div className="ph">
                <em className="icon-bubbles fa-lg pull-right" />
                <div className="h2 mt0">12</div>
                <div className="text-uppercase">
                  Publications
                </div>
              </div>
              <div
                data-sparkline=""
                data-type="line"
                data-width="100%"
                data-height="75px"
                data-line-color="#23b7e5"
                data-chart-range-min="0"
                data-fill-color="#23b7e5"
                data-spot-color="#23b7e5"
                data-min-spot-color="#23b7e5"
                data-max-spot-color="#23b7e5"
                data-highlight-spot-color="#23b7e5"
                data-highlight-line-color="#23b7e5"
                data-values="4,5,3,10,7,15"
                style={{ marginBottom: "-2px" }}
                data-resize="true"
              />
            </div>
          </Col>
          <Col lg={3} md={6} sm={12}>
            {/* START widget*/}
            <div className="panel widget bg-purple-light pt b0 widget">
              <div className="ph">
                <em className="icon-people fa-lg pull-right" />
                <div className="h2 mt0">129,310</div>
                <div className="text-uppercase">
                  Views
                </div>
              </div>
              <div
                data-sparkline=""
                data-type="line"
                data-width="100%"
                data-height="75px"
                data-line-color="#7266ba"
                data-chart-range-min="0"
                data-fill-color="#7266ba"
                data-spot-color="#7266ba"
                data-min-spot-color="#7266ba"
                data-max-spot-color="#7266ba"
                data-highlight-spot-color="#7266ba"
                data-highlight-line-color="#7266ba"
                data-values="1,3,4,5,7,8"
                style={{ marginBottom: "-2px" }}
                data-resize="true"
              />
            </div>
          </Col>
        </Row>
        {/* END widgets box*/}
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
      </ContentWrapper>
    );
  }
}

export default Dashboard;
