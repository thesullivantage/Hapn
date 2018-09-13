import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { Container, Row, Col, Input, Icon, Button } from "react-materialize";
import Logo from "../../components/Logo/index";
import "./Login.css";
import API from "../../utils/API";
import HappnenIcon from "../../components/Icon/index";
import NonUserFab from "../../components/NonUserFab";


class Homepage extends Component {
	state = {
		username: "",
		password: "",
		redirect: false
	};

	handleInputChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		}, () => console.log(this.state.password));
	};

	handleFormSubmit = event => {
		event.preventDefault();
		console.log(`Username: ${this.state.username}\nPassword: ${this.state.password}`);

		const loginObj = {
			username: this.state.username,
			password: this.state.password
		}
		console.log("suObj: ", loginObj)
		API.login(loginObj)
			.then(res => {

				sessionStorage.user = this.state.username;
				this.setState({ username: "", password: "",	redirect: true});				
				// Do this if status is 200
				console.log("GET RES HERE", res)
			})
			.catch(err => console.log(err));
		//alert if all fields aren't completed
	};

	render() {

		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to='/mapdisplay' />;
		}

		return (
			<Container>

				<Row>
					<Logo
						className="Logo"
						alt="HappnenLogo"
						height="500px"
						width="100%"
					/>
				</Row>

				<Row>

					<Input
						s={6}
						// label="Username"
						name="username"
						type="text"
						className="validate"
						value={this.state.username}
						onChange={this.handleInputChange}>
						<Icon>face</Icon>
					</Input>
				</Row>

				<Row>
					<Input
						s={6}
						// label="Password"
						name="password"
						type="password"
						value={this.state.password}
						onChange={this.handleInputChange}>
						<Icon>lock</Icon>
					</Input>
				</Row>

				<Row>
					<Button className="Submit" onClick={this.handleFormSubmit}>Submit</Button>
				</Row>

				<HappnenIcon
					className="Icon"
					alt="HappnenIcon"
					height="320px"
					width="100%" />

			</Container>
		);
	}
}

export default Homepage;
