import React, { Component } from "react";
import "./Signup.css";
import loginImg from "./images/login.svg";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      gender: "",
      phoneNumber: "",
      showMe: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);

    this.handlegenderChange = this.handlegenderChange.bind(this);
  }
  handleUserNameChange(e) {
    this.setState({ userName: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handlegenderChange(e) {
    this.setState({ gender: e.target.value });
  }

  handlePhoneNumberChange(e) {
    this.setState({ phoneNumber: e.target.value });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.email + this.state.password);
    const user = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender,
      phoneNumber: this.state.phoneNumber,
    };
    event.preventDefault();
    if (
      this.state.userName == "" ||
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.gender == "" ||
      parseInt(this.state.phoneNumber) < 0 ||
      parseInt(this.state.phoneNumber == NaN) ||
      this.state.phoneNumber == ""
    ) {
      console.log(parseInt(this.state.phoneNumber));
      this.setState({ showMe: true });
    } else {
      this.setState({ showMe: false });
      axios
        .post("http://localhost:3000/users", user)
        .then(function (response) {
          console.log(response);
          
        })
        .catch(function (error) {
          // handle error

          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="base-container-parent">
        <div className="base-container" ref={this.props.containerRef}>
          <div className="header">Register</div>
          <div className="content">
            <div className="image">
              <img src={loginImg} />
            </div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="UserName">UserName</label>
                <input
                  type="text"
                  name="UserName"
                  placeholder="UserName"
                  value={this.state.value}
                  onChange={this.handleUserNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Phone-Number">PhoneNumber</label>
                <input
                  type="text"
                  name="Phone-Number"
                  min="11"
                  max="11"
                  placeholder="Phone-Number"
                  value={this.state.value}
                  onChange={this.handlePhoneNumberChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  name="Gender"
                  placeholder="Gender (Male/Female)"
                  value={this.state.value}
                  onChange={this.handlegenderChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.value}
                  onChange={this.handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  min="8"
                  max="16"
                  placeholder="password"
                  value={this.state.value}
                  onChange={this.handlePasswordChange}
                />
              </div>
            </div>
          </div>
          <div>
            {this.state.showMe ? (
              <p className="warning">Enter Valid Data!</p>
            ) : null}
          </div>

          <div className="footer">
            <button type="button" className="btn" onClick={this.handleSubmit}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Signup;
