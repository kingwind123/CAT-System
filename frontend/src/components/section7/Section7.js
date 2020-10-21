import { Button, Col, Divider, Radio, Row, Typography } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

class Section7 extends Component {
	constructor(props) {
		super();
		this.state = {
			value: -1,
			sampleItem: 1,
		};
	}

	onChange = (e) => {
		this.setState({
			value: e.target.value,
		});
	};

	render() {
		const img1 = require("../../Site/Images/sure_or_unsure_ex1.png");
		const img2 = require("../../Site/Images/sure_or_unsure_ex2.png");

		return (
			<div className="main-context-div" style={{ fontSize: this.props.fontSize }}>
				<div className="section">
					<Title level={3} align="left">
						SECTION 7: SURE OR UNSURE
					</Title>
					<Divider />
					<div>
						<ul>
							<li>
								<Text style={{ color: "black" }}>First, read the situation in the green box.</Text>
							</li>
							<li>
								<Text style={{ color: "black" }}>
									Then, read what each person says and decide how sure the person is abut what they
									say.
								</Text>
							</li>
							<li>
								<Text style={{ color: "black" }}>Finally, click the appropriate box.</Text>
							</li>
						</ul>
					</div>

					<div style={{ marginTop: "40px" }}>
						<Title level={4} align="left">
							SAMPLE ITEM {this.state.sampleItem}
						</Title>
						<Text strong style={{ color: "black" }}>
							There is a quiz tomorrow: Sure or Unsure?
						</Text>
						<Divider />
					</div>

					<div className="green-text">
						<Text style={{ color: "black" }}>
							A group of friends is trying to figure out if they will have a quiz tomorrow. Some friends
							are very sure there will be a quiz and some friends have doubts.
						</Text>
					</div>

					{this.state.sampleItem === 1 ? (
						<div>
							<Text style={{ color: "black" }}> Friend 1 thinks:</Text>
							<Row>
								<Col span={2} offset={0}>
									<img src={img1} height="50px" alt="img" />
								</Col>
								<Col>
									<Text style={{ color: "black" }}> Yes, there will be a quiz tomorrow.</Text>
								</Col>
							</Row>
						</div>
					) : (
						<div>
							<Text style={{ color: "black" }}> Friend 2 thinks:</Text>
							<Row>
								<Col span={2} offset={0}>
									<img src={img2} height="50px" alt="img" />
								</Col>
								<Col>
									<Text style={{ color: "black" }}> We will for sure not have a quiz tomorrow.</Text>
								</Col>
							</Row>
						</div>
					)}

					<div style={{ marginTop: "20px" }}>
						<Text style={{ color: "black" }}>
							For Friend {this.state.sampleItem}, will there be a quiz tomorrow?
						</Text>
					</div>

					<div style={{ margin: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
						<Radio.Group onChange={this.onChange} value={this.state.value} size="large">
							<Radio value={1} style={{ color: "black" }}>
								Yes
							</Radio>
							<Radio value={2} style={{ color: "black", fontSize: this.props.fontSize }}>
								maybe YES
							</Radio>
							<Radio value={3} style={{ color: "black", fontSize: this.props.fontSize }}>
								maybe NO
							</Radio>
							<Radio value={4} style={{ color: "black", fontSize: this.props.fontSize }}>
								NO
							</Radio>
						</Radio.Group>
					</div>
				</div>

				<div style={{ position: "absolute", bottom: "120px", right: "80px" }}>
					{this.state.sampleItem === 1 ? (
						<Button
							danger
							style={{ color: "green", borderColor: "green" }}
							onClick={() => {
								this.setState({ sampleItem: 2 });
							}}
						>
							Next
						</Button>
					) : (
						<Button danger style={{ color: "green", borderColor: "green" }}>
							<Link to="/section7_1">Next</Link>
						</Button>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		sessionNum: state.sessionNum,
		fontSize: state.fontSize,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		dispatch1: () => {
			dispatch();
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Section7);
