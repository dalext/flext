import React from "react";
import { Col } from "react-bootstrap";
class HeaderHome extends React.Component {
	render() {
		return (
			<div className="intro-header header-home">
				<div className="container">
					<div className="row">
						<div className="col-lg-offset-1 col-md-offset-1 col-md-10">
							<div className="site-heading">
								<h1>Scientific research</h1>
								<span className="header-subheading">
									Has never been easier
								</span>
								<div className="text-center">
									<a className="btn btn-default btn-info" href="/editor">
										Start now
									</a>
									<a
										href="/editor"
										className="btn btn-default btn-info"
										role="button"
									>
										Free trial
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HeaderHome;
