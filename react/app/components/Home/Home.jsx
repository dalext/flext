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
        {/* END widgets box*/}
        <SubHeaderHome />
      </div>
    );
  }
}

export default Home;
