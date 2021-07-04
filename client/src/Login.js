import React, { useState } from "react";
import "./Login.css";
import FB from "./images/project.png";
import Fb from "./images/Facebook-Logo.svg";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import axios from "axios";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";


function Login() {
  const [state, dispatch] = useStateValue();
  const [user, setUser] = useState("");
  const [user1, setUser1] = useState("");
  const [warning, setWarning] = useState("none");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser("");
    setUser1("");
  };
  const signUp2 = (e) => {
    // alert('A name was submitted: ' + this.state.email + this.state.password);
    
    const check = { email: user, password: user1 }
    e.preventDefault();
    axios
      .post("http://localhost:3000/users/login", check)
      .then((response) => {
        console.log(response);
          if (
            user == response.data.user.email &&
            user1 == response.data.user.password
          ) {
            dispatch({
              type: actionTypes.SET_USER,
              user: response.data.user,
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);

          } else{
            setWarning("block");
          }
        })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:3000/users/login", {
  //        email: user,
  //       password: user1
  //      })
  //     .then((response) => {
  //       console.log(response);
  //         if (
  //           user == response.data.user.email &&
  //           user1 == response.data.user.password
  //         ) {
  //           dispatch({
  //             type: actionTypes.SET_USER,
  //             user: response.data.user,
  //           });
  //           localStorage.setItem('token', response.data.token);

  //         } else{
  //           setWarning("block");
  //         }
  //         // response.json().then((result)=>{
  //         //   console.log("result", result)
  //         //   localStorage.setItem('login',JSON.stringify({
  //         //   login:true,
  //         //   token:result.token
  //         // }))
  //         // })
          
  //       })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     });
  // };
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
      
  };
  return (
    <div className="login">
      <div className="header">Login</div>
      <div className="login_logo">
        <img src={FB} alt="Fb_logo" />
        <h1>Go-Findme</h1>
      </div>
      <div className="warning" style={{display:`${warning}`}}>
        {setWarning ?<p>Username or Password is not correct!</p> : <p>Hi</p>}
      </div>
      <input
        className="login-input"
        type="text"
        placeholder="UserName"
        onChange={(e) => {
          setUser(e.target.value);
        }}
      ></input>
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setUser1(e.target.value);
        }}
      ></input>

      <Button type="submit" onClick={signUp2}>
        LogIn
      </Button>
      
      <Button type="submit" onClick={signIn}>
      <Link className="link" to="/">
        Sign In With Google
        </Link>
      </Button>
      
    </div>
  );
}

export default Login;
