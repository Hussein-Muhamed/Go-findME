import React, {Component} from 'react';
import './signin.css';
import loginImg from '../../login.svg';
import axios from "axios";

class Signin extends Component {
    constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

    handleEmailChange(e){
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.email + this.state.password);
    const user = {email: this.state.email , password: this.state.password}
    event.preventDefault();
    axios
        .post("http://localhost:3000/users/login" ,user)
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
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Email address</label>
              <input type="text" name="username" placeholder="username" value={this.state.value} onChange={this.handleEmailChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" value={this.state.value} onChange={this.handlePasswordChange} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.handleSubmit}>
            Login
          </button>
        </div>
      </div>
      );
    }
   
  }
  
  
  export default Signin;