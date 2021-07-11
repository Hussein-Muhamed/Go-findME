import React, { useState, useEffect, useRef } from "react";
import "./Messages.css";
import SendIcon from "@material-ui/icons/Send";
import { Avatar, Button } from "@material-ui/core";
import moment from "moment";
import axios from "axios";
import Header from "./Header";
import MessagesUser from "./MessagesUser";
// import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";

let socket;
const SERVER = "http://localhost:3000/";

// import MessageSend from "./MessageSend";
// import MessageRecieve from "./MessageRecieve";

function Messages(timeStamp) {
  var user = JSON.parse(localStorage.getItem('user'));
  const [message, setMessage] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [data, setData] = useState([]);
  const dataRef = useRef(null);
  dataRef.current = data;

  function send(e) {
    e.preventDefault();
    setMessage(true);
    setMessageInput("");
  }
  //   axios
  //   .get("https://jsonplaceholder.typicode.com/todos%22)
  //   .then((res) =>{
  //       console.log(res.data);
  //       var data = res.data;
  //       data.forEach(element => {
  //           console.log(element.id);
  //         //   console.log(element.title);
  //       });
  //   }).catch((err) =>{
  //       console.log(err);
  //   })
  useEffect(() => {
    fetchData()
    socket = io(SERVER, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("connect", () => {
      console.log("connect");
      socket.on("msgFromServer", (newData) => {
        setData([...dataRef.current, newData]);
        console.log(dataRef.current)
      });
    });

    return () => socket.disconnect();
  }, []);

  const sendMsg = () => {
    var msg = { _id: user.user._id, owner: user.user.userName, message: messageInput };
    setData([...dataRef.current, msg]);
    socket.emit("new_message", msg);
    // req send post
  };


  const fetchData = () => {
    axios({
      method: "GET",
      url: "http://localhost:3000/message",
      headers: { 
        Authorization: localStorage.getItem("token"),
    },
    })
      .then((response) => {
        console.log(response);
        console.log(socket.id);
        setData([...dataRef.current, response.data]);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="messages">
        {/* <div className="leftSide">
          <MessagesUser />
          <MessagesUser />
          <MessagesUser />
          <MessagesUser />
          <MessagesUser />
        </div> */}
        <div className="rightSide">
          <div className="chatViewer">
            <div className="userInfo">
              <Avatar />
              <label>{user.user.userName}</label>
            </div>
            <div className="chatViewer-message">
              {dataRef.current.map((item) => (
                <h1> <span>{`${item.owner}: `}</span> {item.message}</h1>
              ))}
            </div>
            {/* <div className="chatViewer-message">
              {data.map((datas) =>
                datas.id % 2 == 0 ? (
                  <div className="send">
                    <div className="send">
                      <p> {datas.title} </p>
                      <h6>
                        {moment(timeStamp).format("MMMM Do YYYY, h:mm:ss a")}
                      </h6>
                    </div>
                  </div>
                ) : (
                  <div className="recieve">
                    <div className="recieve">
                      <p> {datas.title} </p>
                      <h6>
                        {moment(timeStamp).format("MMMM Do YYYY, h:mm:ss a")}
                      </h6>
                    </div>
                  </div>
                )
              )}
            </div> */}
          </div>
          <div className="messageSender">
            <input
              type="text"
              placeholder="Type to start chat"
              value={messageInput}
              onChange={(e) => {
                setMessageInput(e.target.value);
              }}
            ></input>
            <Button type="submit" className="send-btn" onClick={sendMsg}>
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;