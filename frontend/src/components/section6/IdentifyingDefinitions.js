import { Button, Col, notification, Row, Radio } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import FetchData from "../utils/FetchData";

import { SectionBar, NextQuestionButton } from "../utils/Utils";

const openNotification = () => {
	notification.open({
		message: "You should choose an option to go next.",
		duration: 2.5,
	});
};

function firstUpperCase(s) {
	return s.replace(/^\S/, (s) => s.toUpperCase());
}

class IdentifyingDefinitions extends Component {
	constructor(props) {
		super();

		this.state = {
			selectOption: -1,
			question: "def_aware_umbrella",
			borderStyle: ["none", "none", "none", "none"],
			showElem: "none",
			radioColor: ["black", "black", "black"],
		};
	}

	onClick = (e, val) => {
		this.setState({ selectOption: 1 });
		let newBorderStyle = ["none", "none", "none", "none"];
		newBorderStyle[val - 1] = "solid";
		this.setState({ borderStyle: newBorderStyle });
	};

	onChange = (e) => {
		this.setState({
			selectOption: e.target.value,
		});

		let newRadioColor = ["black", "black", "black"];
		newRadioColor[e.target.value] = "green";
		this.setState({ radioColor: newRadioColor });
	};

	playAudio = () => {
		this.setState({
			showElem: "inline",
		});
	};

	getNextQuestion = async (e) => {
		if (this.state.selectOption === -1) {
			openNotification();
			return;
		}

		let catAns = {
			question: this.state.question,
			answer: this.state.selectOption,
		};
		await FetchData("/UpdateCATAnswer/32", "PUT", catAns).then((res) => res.json());

		let judgeOfAnswer;
		const correctAns = eval("this.props.curState." + String(this.state.question) + ".answer");

		if (correctAns === this.state.selectOption) {
			judgeOfAnswer = "r." + this.state.question;
		} else {
			judgeOfAnswer = "w." + this.state.question;
		}

		await this.props.answerQuestionAns(judgeOfAnswer, this.state.question);

		let data = {
			questionAns: this.props.curState.questionAns,
			questionAnsSum: this.props.curState.questionAnsSum,
			questions: this.props.curState.questions,
			questionSum: this.props.curState.questionSum,
			sectionName: "SYNTAX_PICTURES",
			numQuestions: this.props.curState.numQuestions,
		};

		this.setState({
			selectOption: -1,
		});

		await FetchData("/sumCorrectIncorrect", "PUT", data)
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				} else {
				}
			})
			.then((res) => {
				console.log(res);
				if (res.nextQuestion === "") {
					this.props.clearNumQuestions();
					this.props.history.push("/section6");
				} else {
					this.setState({ question: firstUpperCase(res.nextQuestion) });
				}
			});
	};

	render() {
		const adult1 = require("../../Site/Images/Adult1.png");
		const adult2 = require("../../Site/Images/Adult2.png");
		const children1 = require("../../Site/Images/children1.png");
		const children2 = require("../../Site/Images/children2.png");
		const audio = this.props.curState[this.state.question].audio;
		const questionText1 = this.props.curState[this.state.question].text1;
		const questionText2 = this.props.curState[this.state.question].text2;
		const questionText3 = this.props.curState[this.state.question].text3;
		const keyword = this.props.curState[this.state.question].keyword;

		return (
			<div className="main-context-div" style={{ fontSize: this.props.fontSize }}>
				<div className="identifying_definition">
					<Row style={{ paddingTop: "30px", paddingBottom: "30px" }}>
						<Col span={1} offset={1}>
							A.
						</Col>
						<Col span={8}>{questionText1}</Col>
						<Col span={3} offset={1}>
							<div>A was written for:</div>
						</Col>
						<Col span={4}>
							<div>
								<img src={children1} height="50px" alt="img" />
								<img src={children2} height="50px" alt="img" />
							</div>
						</Col>
						<Col span={2}>
							<div> or</div>
						</Col>
						<Col span={4}>
							<div>
								<img src={adult1} height="50px" alt="img" />
								<img src={adult2} height="50px" alt="img" />
							</div>
						</Col>
					</Row>
					<Row style={{ paddingTop: "30px", paddingBottom: "30px" }}>
						<Col span={1} offset={1}>
							B.
						</Col>
						<Col span={8}>{questionText2}</Col>
						<Col span={3} offset={1}>
							<div>B was written for:</div>
						</Col>
						<Col span={4}>
							<div>
								<img src={children1} height="50px" alt="img" />
								<img src={children2} height="50px" alt="img" />
							</div>
						</Col>
						<Col span={2}>
							<div> or</div>
						</Col>
						<Col span={4}>
							<div>
								<img src={adult1} height="50px" alt="img" />
								<img src={adult2} height="50px" alt="img" />
							</div>
						</Col>
					</Row>
					<Row style={{ paddingTop: "30px", paddingBottom: "30px" }}>
						<Col span={1} offset={1}>
							C.
						</Col>
						<Col span={8}>{questionText3}</Col>
						<Col span={3} offset={1}>
							<div>C was written for:</div>
						</Col>
						<Col span={4}>
							<div>
								<img src={children1} height="50px" alt="img" />
								<img src={children2} height="50px" alt="img" />
							</div>
						</Col>
						<Col span={2}>
							<div> or</div>
						</Col>
						<Col span={4}>
							<div>
								<img src={adult1} height="50px" alt="img" />
								<img src={adult2} height="50px" alt="img" />
							</div>
						</Col>
					</Row>

					<Row>
						Of the three options above, choose the definition of {keyword} that was most likely written for
						adults.
					</Row>

					<div style={{ margin: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
						<Radio.Group onChange={this.onChange} size="large" value={this.state.selectOption}>
							<Radio
								style={{
									color: this.state.radioColor[0],
									fontSize: this.props.fontSize,
								}}
								value={0}
							>
								A
							</Radio>
							<Radio
								style={{
									color: this.state.radioColor[1],
									fontSize: this.props.fontSize,
								}}
								value={1}
							>
								B
							</Radio>
							<Radio
								style={{
									color: this.state.radioColor[2],
									fontSize: this.props.fontSize,
								}}
								value={2}
							>
								C
							</Radio>
						</Radio.Group>
					</div>
				</div>
				<NextQuestionButton getNextQuestion={this.getNextQuestion} />

				<div style={{ position: "absolute", bottom: "0px", width: "100%" }}>
					<SectionBar numSection={6} />
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		fontSize: state.fontSize,
		curState: state.DEFINITIONS_AWARENESS,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		answerQuestionAns(questionAns, question) {
			const action = {
				type: "ANSWER_QUESTION",
				questionAns: questionAns,
				question: question,
			};
			dispatch(action);
		},
		clearNumQuestions() {
			const action = {
				type: "CLEAR_NUM_QUESTION",
			};
			dispatch(action);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(IdentifyingDefinitions);
