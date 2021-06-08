import React, {Component} from 'react';
import './signup.css'
import loginImg from '../../login.svg';
import axios from "axios";
class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {fname: '', lname: '', email: '', password: '', gender: '', phoneNumber: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handlefnameChange = this.handlefnameChange.bind(this);
    this.handlelnameChange = this.handlelnameChange.bind(this);
    this.handlegenderChange = this.handlegenderChange.bind(this);
  }
  handlefnameChange(e){
    this.setState({fname: e.target.value});
  }

  handlelnameChange(e){
    this.setState({lname: e.target.value});
  }
  handleEmailChange(e){
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }

  handlegenderChange(e){
    this.setState({gender: e.target.value});
  }

  handlePhoneNumberChange(e){
    this.setState({phoneNumber: e.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.email + this.state.password);
    const user = {fname: this.state.fname, lname: this.state.lname ,email: this.state.email , password: this.state.password, gender: this.state.gender, phoneNumber: this.state.phoneNumber}
    event.preventDefault();
    axios
        .post("http://localhost:3000/users" ,user)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
  }

    render() {
      return ( 
        <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
          <div className="form-group">
              <label htmlFor="Fname">Fname</label>
              <input type="text" name="Fname" placeholder="Fname" value={this.state.value} onChange={this.handlefnameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="Lname">Lname</label>
              <input type="text" name="Lname" placeholder="Lname" value={this.state.value} onChange={this.handlelnameChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="Phone-Number">PhoneNumber</label>
              <input type="Number" name="Phone-Number" placeholder="Phone-Number" value={this.state.value} onChange={this.handlePhoneNumberChange} />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input type="text" name="Gender" placeholder="Gender" value={this.state.value} onChange={this.handlegenderChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" value={this.state.value} onChange={this.handleEmailChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" value={this.state.value} onChange={this.handlePasswordChange}/>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.handleSubmit}>
            Register
          </button>
        </div>
      </div>
      );
    }
   
  }
export default signup ;