import React, { useEffect, useState } from "react";
import "./Settings.css";
import Header from "./Header";
import InfoIcon from "@material-ui/icons/Info";
import { useStateValue } from "./StateProvider";
import { Button } from "@material-ui/core";
import axios from "axios"

function Settings() {
  const [userName, setuserName] = useState(null);
  const [password, setpassword] = useState(null);
  const [phoneNumber, setphoneNumber] = useState(null);
  const [email, setemail] = useState(null);
  const [ user , dispatch] = useStateValue();
  // const [user, setUsers] = useState([]);
  // useEffect(() => {
  //   fetchData();
  // }, []);
  const handleSubmit = (e) => {
    // if(userName == "" || password == ""  phoneNumber == "" ){

    // }
    const check = { }
    if(userName)
      check.userName = userName;
    if(phoneNumber)
    check.phoneNumber = phoneNumber;
    if(password)
    check.password = password;
    if(email)
    check.email = email;
    axios({
      method: "patch",
      url: "http://localhost:3000/users/me",
      data: check,
      headers: { 
      "Authorization" : localStorage.getItem('token'),
    },
    })
    .then((response) => {
      alert("User Name is Changed successfully")
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    e.preventDefault();
    setuserName("");
    setpassword("");
    setphoneNumber("");
    setemail("");
  }

  return (
    <>
      <Header />
      <div className="setting">
        <div className="setting-left">
          <div className="option">
            <InfoIcon />
            <h3>Personal Information</h3>
          </div>
        </div>

        <div className="setting-right">
          <div className="setting-right-row">
            <label className="username">Change Username</label>
            <input
            value={userName}
            onChange={(e) => {
              setuserName(e.target.value);
            }}
              className="text"
              type="text"
              placeholder="Enter Your New UserName"
            ></input>
            <br></br>
            <label className="password">Change Password</label>
            <input
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
              className="text"
              type="password"
              placeholder="Enter Your New Password"
            ></input>
            <br></br>
            <label className="phoneNumber">Change Phone Number</label>
            <input
            value={phoneNumber}
            onChange={(e) => {
              setphoneNumber(e.target.value);
            }}
              className="text"
              type="Number"
              placeholder="Enter Your New phoneNumber"
            ></input>
            <br></br>
            <label className="email">Change Your Email</label>
            <input
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
              className="text"
              type="text"
              placeholder="Enter Your new Email"
            ></input>
            <br></br>
            <Button onClick={(handleSubmit)}type="submit" >Save</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
