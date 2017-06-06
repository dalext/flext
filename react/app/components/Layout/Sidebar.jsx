import React from "react";
import { Router, Route, Link, History, withRouter } from "react-router";
import { Collapse } from "react-bootstrap";
import SidebarRun from "./Sidebar.run";

class Sidebar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.userBlockClick = this.userBlockClick.bind(this);
    this.state = {
      userBlockCollapse: true,
      collapse: {
        singleview: this.routeActive(["singleview"]),
        submenu: this.routeActive(["submenu"])
      }
    };
  }

  componentDidMount() {
    // pass navigator to access router api
    SidebarRun(this.navigator.bind(this));
  }

  navigator(route) {
    this.props.router.push(route);
  }

  componentWillUnmount() {
    // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
    // pubsub.unsubscribe(this.pubsub_token);
  }

  routeActive(paths) {
    paths = Array.isArray(paths) ? paths : [paths];
    for (let p in paths) {
      if (this.props.router.isActive(paths[p]) === true) return true;
    }
    return false;
  }

  toggleItemCollapse(stateName) {
    var newCollapseState = {};
    for (let c in this.state.collapse) {
      if (this.state.collapse[c] === true && c !== stateName)
        this.state.collapse[c] = false;
    }
    this.setState({
      collapse: {
        [stateName]: !this.state.collapse[stateName]
      }
    });
  }
  userBlockClick() {
    this.setState({
      userBlockCollapse: !this.state.userBlockCollapse
    });
  }

  render() {
    return (
      <aside className="aside">
        {/* START Sidebar (left) */}
        <div className="aside-inner">
          <nav data-sidebar-anyclick-close="" className="sidebar">
            {/* START sidebar nav */}
            <ul className="nav">
              {/* START user info */}
              <li onClick={this.userBlockClick} className="has-user-block">
                <div className="item user-block text-center">
                  <span style={{ color: "white" }}>
                    Profile {"  "}
                    {this.state.userBlockCollapse
                      ? <span className="icon-arrow-down" />
                      : <span className="icon-arrow-up" />}
                  </span>
                </div>
                <Collapse id="user-block" in={this.state.userBlockCollapse}>
                  <div>
                    <div className="item user-block">
                      {/* User picture */}
                      <div className="user-block-picture">
                        <div className="user-block-status">
                          <img
                            src="img/user/02.jpg"
                            alt="Avatar"
                            width="60"
                            height="60"
                            className="img-thumbnail img-circle"
                          />
                          <div className="circle circle-success circle-lg" />
                        </div>
                      </div>
                      {/* Name and Job */}
                      <div className="user-block-info">
                        <span className="user-block-name">Freeman, Lan</span>
                        <span className="user-block-role">
                          Biomedical Engineer
                        </span>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </li>
              {/* END user info */}
              {/* Iterates over all sidebar items */}
              <li className="nav-heading ">
                <span data-localize="sidebar.heading.HEADER">
                  <img
                    src="img/apple-icon-72x72.png"
                    alt="Avatar"
                    width="60"
                    height="60"
                    className="img-thumbnail img-circle center-block"
                  />
                </span>
              </li>

              <li className={this.routeActive("singleview") ? "active" : ""}>
                <Link to="singleview" title="Single View">
                  <em className="icon-grid" />
                  <span data-localize="sidebar.nav.SINGLEVIEW">
                    Your Editor Instances
                  </span>
                </Link>
              </li>

              <li className={this.routeActive(["submenu"]) ? "active" : ""}>
                <div
                  className="nav-item"
                  onClick={this.toggleItemCollapse.bind(this, "submenu")}
                >
                  <div className="pull-right label label-info">1</div>
                  <em className="icon-speedometer" />
                  <span data-localize="sidebar.nav.MENU">Your teams</span>
                </div>
                <Collapse in={this.state.collapse.submenu} timeout={100}>
                  <ul id="submenu" className="nav sidebar-subnav">
                    <li className="sidebar-subnav-header">Submenu</li>
                    <li className={this.routeActive("submenu") ? "active" : ""}>
                      <Link to="submenu" title="Submenu">
                        <span data-localize="sidebar.nav.SUBMENU">
                          University of Stanford
                        </span>
                      </Link>
                    </li>
                    <li className={this.routeActive("submenu") ? "active" : ""}>
                      <Link to="submenu" title="Submenu">
                        <span data-localize="sidebar.nav.SUBMENU">
                          University of Harvard
                        </span>
                      </Link>
                    </li>
                    <li className={this.routeActive("submenu") ? "active" : ""}>
                      <Link to="submenu" title="Submenu">
                        <span data-localize="sidebar.nav.SUBMENU">MIT</span>
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </li>

            </ul>
            {/* END sidebar nav */}
          </nav>
        </div>
        {/* END Sidebar (left) */}
      </aside>
    );
  }
}

export default withRouter(Sidebar);
