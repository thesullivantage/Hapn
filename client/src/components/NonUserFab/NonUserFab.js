import React, { Component } from "react";
import { Redirect } from 'react-router'
import { Container, Row, Col, Input, Icon, Button } from "react-materialize";
import API from "../../utils/API"


class NonUserFab extends Component {

    render() {

        return (

            <Container>
                <Button floating fab='horizontal' toolbarEnabled='true' className='red' icon='add' large style={{ top: '45px', left: '24px' }}>
                    <Button floating icon='pin_drop' className='purple' node='a' href='/mapdisplay'
                        data-position="top" data-delay="50" tooltip="What's Happnen" />
                    <Button floating icon='person' className='blue' node='a' href='/'
                        data-position="top" data-delay="50" tooltip="Login" />
                    <Button floating icon='person_add' className='yellow darken-1' node='a' href='/signup'
                        data-position="top" data-delay="50" tooltip="Create Account" />
                    {/* <Button floating icon='add_box' className='blue' node='a' href='/createevent'
                        data-position="top" data-delay="50" tooltip="Create Event" />
                    <Button floating icon='assignment_ind' className='green' node='a' href='/profile'
                        data-position="top" data-delay="50" tooltip="Profile" />
                    <Button floating icon='person' className='yellow darken-1' node='a' href='/'
                        data-position="top" data-delay="50" tooltip="Logout" onClick="handleLogout" /> */}
                </Button>

            </Container>

        );
    }
}

export default NonUserFab;
