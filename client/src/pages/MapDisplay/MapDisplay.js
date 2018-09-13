import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Input, Icon, Button, Preloader } from "react-materialize";
import "./MapDisplay.css";
import { MapComponent } from "../../components/MapContainer/MapContainer";
import API from "../../utils/API"
import UserFab from "../../components/UserFab";
import NonUserFab from "../../components/NonUserFab";

class MapDisplay extends Component {
    state = {
        loading: true
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1500);
        console.log("Hello out there?")
    }
    render() {


        const { loading } = this.state;

        if (loading) {
            return <Col className="loader" s={4}>
                <Preloader
                    flashing="true"
                    size='big' />
            </Col>;
        }

        return (
            <MapComponent />
        );
    }
}

export default MapDisplay;