import React, { Component } from "react";
import { Container, Row, Col, Input, Icon, Button, CollectionItem } from "react-materialize";
// import { MyEvent } from "./myEvent"
// import { PublicEvent } from "./publicEvent"
import API from "../../utils/API"
import Collection from "react-materialize/lib/Collection";
import Private from "./private";
import Public from "./public";

class MLocation extends React.Component {

	constructor(props) {
		super(props);
	}

	state = {
		data: this.props.data
	}

	render() {
		// console.log("Props", this.props.data)
		// this.props.data.type
		//
		if (this.props.data.type === 2 && this.props.data.type) {
			return (
				<Private data={this.props.data}/>
			);

		} else {
			return (
				<Public data={this.props.data}/>
			)
		}


		// } else if (type == "myEvent") {
		//   return <MyEvent data={passdata} />
		// } else {
		//   return <PublicEvent data={passdata} />
		// }
	}
}

export default MLocation;