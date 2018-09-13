import React, { Component } from "react";
import { Container, Row, Col, Input, Icon, Button, CollectionItem, Modal, SideNavItem } from "react-materialize";
import API from "../../../utils/API";
import moment from 'moment';
import DeleteBtn from "../../DeleteBtn";
import AcceptBtn from "../../AcceptBtn";
import EventLabel from "../misc/EventLabels";
import QRCode from 'react-qr-code';


// helper function to convert date
function convertDate(inputDate) {
	// adjust format here to adjust all dates displayed:
	return moment(inputDate).format("llll")
}

class PublicEvent extends React.Component {



	componentDidMount() {

	}


	
	render() {
		const markers = this.props.markerObj.marker
		console.log(markers)
		if (markers) {
			return (
				markers.map(event => (


					<Modal
						header
						basic
						trigger={
							<SideNavItem waves key={event.eventName} eventName={event.eventName} onClick={() => console.log(event)}>
								{event.eventName} <br /> <h1> hosted by {event.host} </h1>
							</SideNavItem>

						}>

						<Row>
							<Col>
								<h1>{event.eventName}</h1>
								<h4>Hosted by {event.host}</h4>
							</Col>
							<Col className="qrCode">
								<QRCode size={96} value={event.eventQr} />
							</Col>
						</Row>
						<h5>Location: {event.location}</h5>
						<h5>Start Date: {convertDate(event.startDate)}</h5>
						<h5>End Date: {convertDate(event.endDate)}</h5>
						<h5 style={{marginLeft: "15px"}}>Description:{event.description} </h5>
						<p style={{marginLeft: "15px"}}>{event.description}</p>

					</Modal>
				))





				// impData.map(item =>
				// 	<CollectionItem>
				// 		<AcceptBtn />
				// 		<DeleteBtn />
				// 		<Modal
				// 			header
				// 			basic
				// 			trigger={<Button>{item.eventName}</Button>}>
				// 			<h1>{item.eventName}</h1>
				// 			<h3>Hosted by {item.host}</h3>
				// 			<h4>Start Date: {convertDate(item.startDate)}</h4>
				// 			<h4>End Date: {convertDate(item.endDate)}</h4>
				// 			<h5>Description: </h5>
				// 			<p>{item.description}</p>

				// 		</Modal>
				// 	</CollectionItem>
				// )
			)
		} else {
			return <h1>No Events Nearby :-(</h1>
		}
	}

}

export default PublicEvent;


