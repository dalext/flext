import React from "react";
import ContentWrapper from "../Layout/ContentWrapper";
import { Grid, Row, Col, Panel, Button } from "react-bootstrap";

class RickHomeChart extends React.Component {
	render() {
		let iconClasses = this.props.icon + " fa-lg pull-right";
		return (
				<div className="panel widget bg-purple-light pt b0 widget" style={{height:"150px"}}>
					<div className = "rickshaw_graph" style={{height:"75px"}} id={this.props.identifier}>
						<div className="ph">
							<em className={iconClasses} />
							<div className="h2 mt0">
								{this.props.title}
							</div>
							<div className="text-uppercase">{this.props.subtitle}</div>
						</div>
					</div>
				</div>
		);
	}
}

export default RickHomeChart;
