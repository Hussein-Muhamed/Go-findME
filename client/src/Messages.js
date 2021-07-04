import React, { useState, useEffect } from "react";
import "./Messages.css";
import SendIcon from "@material-ui/icons/Send";
import { Avatar, Button } from "@material-ui/core";
import moment from "moment";
import axios from "axios";
import Header from "./Header";
import MessagesUser from "./MessagesUser";
// import MessageSend from "./MessageSend";
// import MessageRecieve from "./MessageRecieve";

function Messages(timeStamp) {
  const [message, setMessage] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [data, setData] = useState([]);

  function send(e) {
    e.preventDefault();
    setMessage(true);
    setMessageInput("");
  }
  //   axios
  //   .get("https://jsonplaceholder.typicode.com/todos")
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
    fetchData();
  }, []);
  const fetchData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        console.log(response);
        setData([...response.data]);
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
        <div className="leftSide">
          <MessagesUser />
          <MessagesUser />
          <MessagesUser />
          <MessagesUser />
          <MessagesUser />
        </div>
        <div className="rightSide">
          <div className="chatViewer">
            <div className="userInfo">
              <Avatar />
              <label>userName</label>
            </div>
            <div className="chatViewer-message">
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
            </div>
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
            <Button type="submit" className="send-btn" onClick={send}>
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
