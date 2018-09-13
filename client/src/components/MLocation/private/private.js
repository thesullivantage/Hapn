import React, { Component } from "react";
import { Container, Row, Col, Input, Icon, Button, CollectionItem, Modal } from "react-materialize";
import API from "../../../utils/API";
import moment from 'moment';
import ShowButton from "./ShowButton";
import Grey from "./Grey";

// helper function to convert date
function convertDate(inputDate) {
	// adjust format here to adjust all dates displayed:
	return moment(inputDate).format("llll")
}

class Private extends React.Component {

	state = {
		GTG: false,
		invited: true,
		userId: ""
	};

	componentDidMount = () => {
		console.log("GODS NOT DEAD!")
		console.log("PROPS", this.props.data._id)

		const checkObj = {
			eventId: this.props.data._id,
			username: sessionStorage.user
		}

		//checking on front end
		
		API.findUser(checkObj)
			.then(user => {
				console.log("USERFOUND", user)
				this.setState({
					userId: user.data._id
				}, () => {
					//Still using API.checker to avoid taking away the backend checking potential altogether
					
					var spentArr = this.props.data.spentIds
					console.log("spentArr", spentArr)
					var spent;
					if (spentArr.length == 0) {
						console.log("Step 1")
						this.setState({
							GTG: true
						}, () => console.log("DONE!", this.state.GTG))
					} else if (spentArr.length > 0) {
						console.log("Step 1")
						const checkSpent = spentArr.includes(this.state.userId)
						console.log("deciding vote", checkSpent)
						if (checkSpent == false) {
							this.setState({
								GTG: true
							}, () => console.log("DONE!", this.state.GTG))
						} else {
							return;
						}
						console.log("AM i here Yet?", spent)
					}
					// API.checker(checkObj)
					// 	.then(res => {
					// 		console.log("CHECKER", res)
					// 		var invArr = res.invited
					// 		var invited = true
					// 		if (invArr) {
					// 			invited = invArr.includes(this.state.userId)
					// 			console.log("TEEEEST", invited)
					// 		}
					// 		if (invited == true) {
					// 				console.log("STEP1COMPLETE")
					// 				var spentArr = res.spentIds
					// 				console.log("spentArr", spentArr)
					// 				var spent = true;
					// 				if (spentArr === undefined) {
					// 					spent = false
					// 				} else if (spentArr.length) {
					// 					spent = spentArr.includes(this.state.userId)
					// 					console.log("AM i here Yet?", spent)
					// 				}
					// 				if (spent == false) {
					// 					this.setState({
					// 						GTG: true
					// 					}, () => console.log("DONE!", this.state.GTG))
					// 				} else {
					// 					return;
					// 				}

					// 		} else {
					// 			return;
					// 		}
					// 	})
					// 	.catch(err => console.log("BAD CHECKER ERR!", err));
				})
			})
			.catch(err => console.log("BAD USER ERR!", err));



		// API.
	}


	render = () => {
		// console.log("I'm ALIVE", this.props)
		if (this.state.GTG == true) {
			return (
				//add props here
				<ShowButton data={this.props.data} user={this.state.userId}/>
			)
		}
		else {
			return (
				<Grey />
			)
		}
	}

}

export default Private;


