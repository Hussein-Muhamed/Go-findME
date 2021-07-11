import React from "react";
import './MessageRecieve.css'
import moment from "moment";
function MessageRecieve(title,timeStamp) {
  return (
    <div className="message-structure-recieve">
      <div className="recieve">
        <div className="recieve">
          <p>{title}</p>
          <h6>{moment(timeStamp).format("MMMM Do YYYY, h:mm:ss a")}</h6>
        </div>
      </div>
    </div>
  );
}

export default MessageRecieve;
