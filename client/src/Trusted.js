import React, { useEffect, useState } from "react";
import "./Trusted.css";
import Header from "./Header";
import InfoIcon from "@material-ui/icons/Info";
// import { useStateValue } from "./StateProvider";
import { Button } from "@material-ui/core";
import axios from "axios";
import "./Trusted.css";
import Contact from "./Contact";
import Avatar1 from "./images/avatar1.png";
import Avatar2 from "./images/avatar2.png";
import Avatar3 from "./images/avatar3.png";
import Avatar4 from "./images/avatar4.jpg";
import mAli from "./images/mAli.png";
import om from "./images/om.png";
import SearchIcon from "@material-ui/icons/Search";
import { set } from "lodash";
import SideBarRow from "./SideBarRow";

function Trusted() {
  const [Name, setName] = useState(null);
  const [name, setname] = useState(null);
  const [address, setaddress] = useState(null);
  const [phoneNumber, setphoneNumber] = useState(null);
  const [email, setemail] = useState(null);
  const [trusted, setTrusted] = useState([]);
  const [trustedName, setTrustedName] = useState([]);
  const [posts, setPosts] = useState([]);
  const [trustedContact, setTrustedContact] = useState("none");
  // {
  //   useEffect(() => {
  //     show();
  //   }, []);
  // }

  const Add = (e) => {
    const check = {
      Name: Name,
      phoneNumber: phoneNumber,
      email: email,
      address: address,
    };
    axios({
      method: "POST",
      url: "http://localhost:3000/trusted",
      data: check,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        alert("Trusted people add successfully!");
        console.log(response);
      })
      .catch(function (error) {
        alert("unvalid data");
        console.log(error);
      });
    e.preventDefault();
    setName("");
    setaddress("");
    setphoneNumber("");
    setemail("");
  };

  const show = (e) => {
    axios({
      method: "GET",
      url: "http://localhost:3000/trusted",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setTrusted([...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Delete = (e) => {
    const data = {
      name: name,
    };
    axios({
      method: "DELETE",
      url: "http://localhost:3000/trusted",
      data: data,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    e.preventDefault();
    setname("");
  };

  const trustContacts = () => {
    setTrustedContact("flex");
  };

  return (
    <>
      <Header />
      <div className="trusted">
        <div className="trusted-left">
          <div className="option">
            <InfoIcon />
            <h3>Trusted People</h3>
          </div>
        </div>

        <div className="trusted-right">
          <div className="trusted-right-row">
            <div className="r-side">
              <div className="label">
                <label className="username">Enter userName</label>
                <label className="password">Enter address</label>
                <label className="phoneNumber">Enter Phone Number</label>
                <label className="email">Enter Your Email</label>
              </div>

              <div className="t-input">
                <input
                  value={Name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="text"
                  type="text"
                  placeholder="Enter Your New UserName"
                ></input>
                <br></br>

                <input
                  value={address}
                  onChange={(e) => {
                    setaddress(e.target.value);
                  }}
                  className="text"
                  type="text"
                  placeholder="Enter Your Address"
                ></input>
                <br></br>

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

                <input
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  className="text"
                  type="text"
                  placeholder="Enter Your new Email"
                ></input>
              </div>

              <div className="i-input">
                <div className="label2">
                  <label className="username">Delete Trusted</label>
                </div>
                <input
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  className="text"
                  type="text"
                  placeholder="Type UserName you want to delete"
                ></input>
              </div>
            </div>

            <Button onClick={Add} className="btn1" type="submit">
              Add trusted people
            </Button>
            <Button onClick={show} className="btn2" type="submit">
              Show trusted people
            </Button>
            <Button onClick={Delete} className="btn3" type="submit">
              Delete trusted people
            </Button>

            {/* <Button onClick={(Remove)}type="submit" >Remove trusted people</Button> */}
            {/* <div className="back-data" onClick={show}>
              <h1>Show Me</h1>
              <label>{trusted}</label>
            </div> */}
            <div className="trusted-people">
              {trusted.map((post) => (
                <SideBarRow src={Avatar1} title={post.Name} />
              ))}
            </div>
            {/* <div className="contacts1">
              {
                trusted.map((t)=>{
                  
                  <SideBarRow src={Avatar1} title={t.fname}/>
                })
              }
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Trusted;
