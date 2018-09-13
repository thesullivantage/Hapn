import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Input, Icon, Button, Collection, CollectionItem, Preloader } from "react-materialize";
import Logo from "../../components/Logo/index";
import HappnenIcon from "../../components/Icon/index";
import "./Profile.css";
import cloudinary from "cloudinary";
import MCollection from "../../components/MCollection/";
import API from "../../utils/API";
import EventLabel from "../../components/MCollection/misc/EventLabels";
import UserFab from "../../components/UserFab";

cloudinary.config({
    cloud_name: 'happnen',
    api_key: '782769678216731',
    api_secret: 'GX7JX8WmSTNIhq4dlBLKkXqO_lE'
});


class Profile extends Component {

    state = {
        userData: [],
        username: "",
        bio: "",
        picLink: null,
        events: "",
        loading: true
    };


    // componentDidMount() {
    //     API.populateProfile(username);
    //
    // }

    // loadEvents = (username) => {
    //     API.getEvents(username)
    //     .then(res =>
    //     this.setState({eventsShit}))
    //     .catch(err => console.log(err));
    // };

    componentDidMount = () => {

        setTimeout(() => this.setState({ loading: false }), 1500);

        this.setState({ username: sessionStorage.user }, () => {

            console.log(sessionStorage.user)

            if (this.state.username) {
                let userObj = {
                    username: this.state.username
                }
                console.log(userObj)
                API.populateProfile(userObj)
                    .then(res => {
                        console.log(res.data)
                        this.setState({
                            userData: res.data,
                            bio: res.data.bio,
                            // picLink: res.data.picLink
                            // events: this.state.user.myEvents
                        }, () => {
                            //map
                            console.log(this.state.userData)
                        })
                        console.log("SUCCESS")
                    })
                    .catch(err => console.log(err));
            }
        })
    };


    //Don't worry about this:
    // populateFunction = () => {
    //     const userObj = {
    //         username: sessionStorage.user
    //     }
    //     API.populateProfile(userObj)
    //         .then(res => {
    //             console.log(res)
    //             this.setState({
    //                 userData: res,
    //                 bio: this.state.user.bio,
    //                 picLink: this.state.user.picLink,
    //                 // events: this.state.user.myEvents
    //             })
    //             console.log("SUCCESS")

    //         })
    //         .catch(err => console.log(err));
    // }

    handleInputChange = event => {
        console.log(this.state)
        console.log(event.target)

        const { name, value } = event.target;

        this.setState({
            [name]: value
        }, () => console.log(this.state.bio));
        console.log(this.state)
    };

    handleFormSubmit = event => {
        event.preventDefault();
        alert("Profile settings saved.");
        const biom = this.state.bio
        if (this.state.username) {
            API.updateProfile({
                username: this.state.username,
                bio: biom,
                picLink: this.state.picLink
            })
                .then(res => {
                    console.log(res);
                    this.setState({
                        bio: res.data.bio
                    })
                })
                .catch(err => console.log(err));
        };
    }
    // if (this.state.picLink) {
    //     API.savePhoto({
    //     picLink: this.state.picLink
    //     })
    //     .then(res => this.loadPhoto())
    //     .catch(err => console.log(err));



    render() {

        const { loading } = this.state;

        if (loading) {
            return <Col className="loader" s={4}>
                <Preloader 
                flashing="true"
                size='big' />
            </Col>;
        }

        const passData = {
            obj: this.state.userData
        }
        console.log(passData)

        return (
            <Container>

                <HappnenIcon
                    className="profileIcon"
                    alt="HappnenIcon"
                    height="300px"
                    width="75%" />

                <Row className="userHeader">
                    <h1>Username: {this.state.username}</h1>
                </Row>

                <Row>
                    {/* Change cloudinary to file */}
                    <Icon>camera_roll</Icon>
                    <Input
                        s={4}
                        placeholder="Link a Profile Pic"
                        name="picLink"
                        type="file"
                        label="Profile Photo"
                        className="profilePhoto"
                        value={this.state.picLink}
                        onChange={this.handleInputChange} />
                    {/* {cloudinary.image(this.state.picLink, { width: 100, height: 150, crop: "fill" })}/> */}
                </Row>

                <Row>
                    <Input
                        s={12}
                        placeholder="Enter Your Bio"
                        label="Bio"
                        name="bio"
                        type="textarea"
                        className="userBio"
                        value={this.state.bio}
                        onChange={this.handleInputChange}>
                        <Icon>mode_edit</Icon>
                    </Input>
                </Row>

                {/* Invite List */}

                <Row>
                    <Col>
                        <EventLabel
                            text="Your Invitations"
                        />
                        <MCollection
                            type="invitation"
                            data={passData}
                        />
                    </Col>
                    <Col>
                        <EventLabel
                            text="Hosted Events"
                        />
                        <MCollection
                            type="myEvents"
                            data={passData}
                        />
                    </Col>
                </Row>

                {/* My Events */}

                <Row>
                    <Button
                        className="Submit"
                        onClick={this.handleFormSubmit}>Save Profile</Button>
                </Row>

            </Container>

        )
    };
}

export default Profile;