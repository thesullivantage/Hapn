import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router'
import { Container, Row, Col, Input, Icon, Button } from "react-materialize";
import Logo from "../../components/Logo/index";
import "./Signup.css";
import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import HappnenIcon from "../../components/Icon/index";
import API from "../../utils/API";
import NonUserFab from "../../components/NonUserFab";

const dictionary = {
  alphabet: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
}

class Signup extends Component {
  state = {
    username: "",
    password: "",
    passwordValidate: "",
    passValid: false,
    birthday: null,
    email: "",
    ofAge: false,
    events: [],
    userEvents: [],
    invites: [],
    redirect: false,
    userQr: ""
  };


  componentDidMount = () => {
    let randomQr = ""
    for (let i = 0; i < 12; i++) {
      randomQr += dictionary.alphabet[Math.floor(Math.random() * dictionary.alphabet.length)]
    }
    console.log(randomQr)
    this.setState({
      userQr: randomQr
    });
    console.log(this.state)
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    let age = moment().diff(this.state.birthday, 'years');

    this.setState({
      [name]: value
    }, () => {

      let pass = this.state.password;
      let passVal = this.state.passwordValidate;
      // console.log(pass);
      // console.log(passVal);

      if (pass === passVal && pass !== "" && passVal !== "") {
        this.setState({
          passValid: true
        })
      }

      else {
        this.setState({
          passValid: false
        })
      }
    });

    if (age >= 21) {
      this.setState({
        ofAge: true
      })
      // console.log(this.state.ofAge);
      // console.log(age);
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      birthday: null
    };
    this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
  }

  handleBirthdayChange(date) {
    const years = moment().diff(date, 'years', true);
    this.setState({
      birthday: date
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.username && this.state.passValid === true && this.state.email) {
      console.log("FIRST", this.state.username)
      API.signUp({
        username: this.state.username,
        password: this.state.password,
        birthday: this.state.birthday,
        ofAge: this.state.ofAge,
        email: this.state.email,
        userQr: this.state.userQr
      })
        .then(res => {
          console.log(res);
          console.log(this.state.username);
          console.log(this.state.passValid);
          console.log(this.state.ofAge);
          sessionStorage.user = this.state.username;
          this.setState({ username: "", password: "", passwordValidate: "", passValid: false, email: "", ofAge: false, userQr: "", redirect: true });
          console.log(sessionStorage.user)
        })
        .catch(err => console.log(err));

    }

    else {
      alert("Please complete all fields and match passwords.")
    }

  };


  render() {

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/profile' />;
    }

    return (
      <Container>

        <Row>
          <Logo
            className="Logo"
            alt="HappnenLogo"
            height="300px"
            width="75%"
          />
        </Row>

        <Row>
          <Input
            s={12}
            label="Username"
            name="username"
            type="text"
            className="validate"
            value={this.state.username}
            onChange={this.handleInputChange}>
            <Icon>account_box</Icon>
          </Input>
        </Row>

        <Row className="passwordRow">
          <Input
            s={6}
            label="Password"
            name="password"
            type="password"
            className="validate"
            value={this.state.password}
            onChange={this.handleInputChange}>
            <Icon>lock</Icon>
          </Input>

          <Input
            s={6}
            label="Confirm Password"
            name="passwordValidate"
            type="password"
            className="validate"
            value={this.state.passwordValidate}
            onChange={this.handleInputChange}>
            <Icon>lock</Icon>
          </Input>
        </Row>

        <Row>
          {/* <Icon>pregnant_woman</Icon> */}
          <Icon>child_friendly</Icon>
          <DatePicker
            s={6}
            name="birthday"
            type="date"
            className="birthday"
            calendarClassName="datepicker"
            isClearable={true}
            selected={this.state.birthday}
            value={this.state.birthday}
            showYearDropdown
            dateFormatCalendar="MMMM"
            scrollableYearDropdown
            yearDropdownItemNumber={50}
            maxDate={moment()}
            onChange={this.handleBirthdayChange}
            withPortal
            placeholderText="Enter Your Birthday"
          />

          <Input
            s={6}
            label="Email"
            name="email"
            type="email"
            className="validate"
            value={this.state.email}
            onChange={this.handleInputChange}>
            <Icon>email</Icon>
          </Input>
        </Row>

        <Row>
          <Button className="signupSubmit" onClick={this.handleFormSubmit}>Submit</Button>
        </Row>

      </Container>
    );
  }
}

export default Signup;