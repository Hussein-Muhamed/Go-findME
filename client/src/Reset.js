import axios from "axios";
import React, { useState } from "react";
import "./Reset.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function Reset() {
  const [email, setEmail] = useState(null);

  const resetPassword = (e) => {
    const check = {
      email: email,
    };
    axios({
      method: "POST",
      url: "http://localhost:3000/forgetpassword",
      data: check,
    })
      .then(function (response) {
        alert("Please Check Your Mail, We send a new Password to you")
        console.log(response);
      })
      .catch(function (error) {
        alert("Email not found!")
        console.log(error.message);
      });
    setEmail("");
  };
  return (
    <div className="reset">
      <h2>Reset Password</h2>
      <input
        type="email"
        placeholder="Type your Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <div className="r-btn">
      <Link  className="link-btn">
        <Button className="reset-btn" onClick={resetPassword} type="submit">
          Submit
        </Button>
        </Link>
        <Link to="/" className="link-btn">
        <Button style={{textDecoration:`none`}} className="reset-btn" type="submit">
          Cancel
        </Button>
        </Link>
      </div>
      {/* <p>Please Check Your Email</p> */}
    </div>
  );
}
export default Reset;
