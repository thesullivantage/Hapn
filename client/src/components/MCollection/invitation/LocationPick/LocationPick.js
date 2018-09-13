import React, { Component } from "react";
import { Container, Row, Col, Input, Icon, Button } from "react-materialize";
import { Invitation } from "./invitation/";
import { MyEvent } from "./myEvent"
import { PublicEvent } from "./publicEvent"
import API from "../../utils/API"

const type = props => { props.type };
const passdata = props => { props.data }

class MCollection extends React.Component {

	componentDidMount() {
		
	}

	render() {



		// if (type == "invitation") {
		//   return <Invitation data={passdata} />;
		// } else if (type == "myEvent") {
		//   return <MyEvent data={passdata} />
		// } else {
		//   return <PublicEvent data={passdata} />
		// }

	}

}

export default MCollection;