import React from "react";
import { compose, withProps, withStateHandlers, withHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import { Button, Icon, Modal, SideNav, SideNavItem, Row, Col, Input } from 'react-materialize';
import API from "../../utils/API";
import moment from 'moment';
import QRCode from 'react-qr-code';
import RequestInviteBtn from "../../components/RequestInviteBtn";
import AddEventBtn from "../../components/AddEventBtn";
import MCollection from "../MCollection";

// helper function to convert date
function convertDate(inputDate) {
	// adjust format here to adjust all dates displayed:
	return moment(inputDate).format("llll")
}

const Map = compose(

	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCzhrxRlHVOD13tasY5VxcdBrOGeDjsPIU&v=3.exp&libraries=geometry,drawing,places",
		containerElement: <div style={{ height: `100vh`, width: `100vw` }} />,
		loadingElement: <div style={{ height: `100%` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withStateHandlers(() => ({
		markerOpen: null,
	}), {
			onToggleOpen: ({ markerOpen }) => (markerId) => ({
				markerOpen: markerId
			})
		}),
	withHandlers({
		onMarkerClustererClick: () => (markerClusterer) => {
			const clickedMarkers = markerClusterer.getMarkers()
			console.log(`Current clicked markers length: ${clickedMarkers.length}`)
			console.log(clickedMarkers)
		},
	}),
	withScriptjs,
	withGoogleMap
)((props) =>
	<GoogleMap
		defaultZoom={14}
		defaultCenter={{ lat: 33.749, lng: -84.388 }}
	>
		<MarkerClusterer
			onClick={props.onMarkerClustererClick}
			averageCenter
			enableRetinaIcons
			gridSize={60}
		>
			{props.markers.map(marker => (
				<Marker
					key={marker._id}
					position={{ lat: marker.latitude, lng: marker.longitude }}
					currentMarkerClicked={false}
					onClick={props.onToggleOpen.bind(null, marker._id)}
				>
					{props.markerOpen === marker._id ? <InfoWindow onCloseClick={props.onToggleOpen.bind(null, marker._id)}>
						<div>
							{/* EVENT INFORMATION DISPLAYED IN MARKER */}
							<h5>{marker.eventName}</h5>
							<p>{marker.location}</p>
							<p>Starts: {convertDate(marker.startDate)}</p>
							<p>Ends: {convertDate(marker.endDate)}</p>
							<Modal
								basic
								trigger={<Button waves='light'>More Info<Icon right>event</Icon></Button>}>
								{/* EVENT INFORMATION DISPLAYED IN MODAL */}
								<Row>
									<Col s={6}>
										<h1>{marker.markerName}</h1>
										<h4>Hosted by {marker.host}</h4>
									</Col>
									<Col s={6} className="qrCode right-align">
										<QRCode size={96} value={marker.eventQr} />
									</Col>
								</Row>
								<h5 style={{ marginLeft: "15px" }}>Location: {marker.location}</h5>
								<h5 style={{ marginLeft: "15px" }}>Start Date: {convertDate(marker.startDate)}</h5>
								<h5 style={{ marginLeft: "15px" }}>End Date: {convertDate(marker.endDate)}</h5>
								<h5 style={{ marginLeft: "15px" }}>Description:{marker.description} </h5>
								<p style={{ marginLeft: "15px" }} className="event-description">{marker.description}</p>
								<AddEventBtn waves='light'></AddEventBtn>
							</Modal>
						</div>
					</InfoWindow> : null}
				</Marker>
			))}
		</MarkerClusterer>
	</GoogleMap>

);

export class MapComponent extends React.Component {

	state = {
		activeFilter: "All"
	}

	componentWillMount = () => {
		this.setState({ markers: [] })
	}

	componentDidMount = () => {
		this.loadMarkers()
	}

	loadMarkers = () => {
		//passing in this.state.activeFilter into below function
		switch (this.state.activeFilter) {
			case "All":
				API.getEventLocations()
					.then(res => {
						this.setState({ markers: res.data });
					})
					.catch(error => console.error('Error', error));
				break;
			case "Today":
				console.log("dailyEvents")
				API.getDailyLocations()
					.then(res => {
						this.setState({ markers: res.data });
					})
					.catch(error => console.error('Error', error));
				break;
			case "Weekly":
				API.getWeeklyLocations()
					.then(res => {
						this.setState({ markers: res.data });
					})
					.catch(error => console.error('Error', error));
				break;
			case "Monthly":
				API.getMonthlyLocations()
					.then(res => {
						this.setState({ markers: res.data });
					})
					.catch(error => console.error('Error', error));
				break;
		}
		console.log("switch over")
		// switch for activeFilter
	}

	// dateRange picker
	dateFilter = event => {
		const { value } = event.target
		this.setState({

			activeFilter: value,

		},
			// rerun loadmarkers to render them
			() => this.loadMarkers()
		)
	}

	render() {
		console.log(this.state.markers)
		const markerObj = {
			marker: this.state.markers
		}
		console.log(markerObj)
		return (
			<div>
				<Map markers={this.state.markers} />
				<Row>
					<Input s={12} type='select' label="Time Select" defaultValue='All' onChange={this.dateFilter}>
						<option value='All'>All Events</option>
						<option value='Today'>Today's Events</option>
						<option value='Weekly'>Weekly Events</option>
						<option value='Monthly'>Monthly Events</option>
					</Input>
				</Row>
				<SideNav
					trigger={<Button style={{ position: 'absolute', bottom: '40px', left: '10px', zIndex: '4' }}>Events List</Button>}
					options={{ closeOnClick: true }}
				>
					<SideNavItem userView
						user={{
							background: 'https://media.gettyimages.com/photos/atlanta-skyline-and-highway-at-sunset-picture-id162452615?b=1&k=6&m=162452615&s=170667a&w=0&h=-I7V_xOkGjXznkAFodwBkljD1H235i7YXIQ1b11ypUE=',
							image: '',
							name: 'Events',
							email: 'Public'
						}}
					/>

					<MCollection
						type="publicEvents"
						markerObj={markerObj}
					/>



				</SideNav>
			</div>
		)
	}
}
