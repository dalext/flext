import React from "react";
import pubsub from "pubsub-js";
import HeaderRun from "./Header.run";
import { NavDropdown, MenuItem, NavItem } from "react-bootstrap";
import { Router, Route, Link, History } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class HeaderLoggedIn extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}
	componentDidMount() {
		HeaderRun();
	}
	handleLogout() {
		// remove cookie
    cookies.remove("science");
		document.location = "http://" + SERVER_DOMAIN + ":" + SERVER_PORT;
	}
	toggleUserblock(e) {
		e.preventDefault();
		pubsub.publish("toggleUserblock");
	}

	render() {
		const ddAlertTitle = (
			<span>
				<em className="icon-bell" />
				<span className="label label-danger">11</span>
			</span>
		);

		return (
				<header className="topnavbar-wrapper">
					{/* START Top Navbar */}
					<nav role="navigation" className="navbar topnavbar">
						{/* START navbar header */}
						<div className="navbar-header">
							<a href="#/" className="navbar-brand">
								<div className="brand-logo">
									<img
										src="img/science1.png"
										alt="App Logo"
										className="img-responsive logo-img"
									/>
								</div>
								<div className="brand-logo-collapsed">
									<img
										src="img/science1.png"
										alt="App Logo"
										className="img-responsive logo-img"
									/>
								</div>
							</a>
						</div>
						{/* END navbar header */}
						{/* START Nav wrapper */}
						<div className="navbar-collapse collapse">
							{/* START Left navbar */}
							<ul className="nav navbar-nav">
								<NavDropdown
									noCaret
									eventKey={3}
									title="Product"
									id="dashboard-nav-dropdown"
								>
									<LinkContainer to="featues">
										<MenuItem className="animated fadeIn" eventKey={3.1}>
											Features
										</MenuItem>
									</LinkContainer>
									<LinkContainer to="alerts">
										<MenuItem className="animated fadeIn" eventKey={3.3}>
											Alerts
										</MenuItem>
									</LinkContainer>
								</NavDropdown>
								<LinkContainer to="pricing">
									<NavItem>Pricing</NavItem>
								</LinkContainer>
								<LinkContainer to="integrations">
									<NavItem>Integrations</NavItem>
								</LinkContainer>
								<LinkContainer to="about">
									<NavItem>About</NavItem>
								</LinkContainer>
							</ul>
							{/* END Left navbar */}
							{/* START Right Navbar */}
							<ul className="nav navbar-nav navbar-right">
								{/* Search icon */}
								<li>
									<a href="#" data-search-open="">
										<em className="icon-magnifier" />
									</a>
								</li>
								<NavDropdown
									noCaret
									eventKey={3}
									title={ddAlertTitle}
									id="basic-nav-dropdown"
								>
									<MenuItem className="animated flipInX" eventKey={3.2}>
										Profile
									</MenuItem>
									<MenuItem className="animated flipInX" eventKey={3.3}>
										Dashboard
									</MenuItem>
									<MenuItem divider />
									<MenuItem
										onSelect={this.handleLogout}
										className="animated flipInX"
										eventKey={3.3}
									>
										Logout
									</MenuItem>
								</NavDropdown>
								{/* Fullscreen (only desktops) */}
								<li className="visible-lg">
									<a href="#" data-toggle-fullscreen="">
										<em className="fa fa-expand" />
									</a>
								</li>
							</ul>
							{/* END Right Navbar */}
						</div>
						{/* END Nav wrapper */}
						{/* START Search form */}
						<form role="search" action="search.html" className="navbar-form">
							<div className="form-group has-feedback">
								<input
									type="text"
									placeholder="Type and hit enter ..."
									className="form-control"
								/>
								<div
									data-search-dismiss=""
									className="fa fa-times form-control-feedback"
								/>
							</div>
							<button type="submit" className="hidden btn btn-default">
								Submit
							</button>
						</form>
						{/* END Search form */}
					</nav>
					{/* END Top Navbar */}
				</header>
		);
	}
}
