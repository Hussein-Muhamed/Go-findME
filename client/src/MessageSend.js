import React from 'react'
import './MessageSend.css'
import moment from "moment";

function MessageSend(innerMsg, timeStamp) {
    return (
        <div className="message-structure">
            <div className="send">
                <div className="send">
                  <p> {innerMsg} </p>
                  <h6>{moment(timeStamp).format("MMMM Do YYYY, h:mm:ss a")}</h6>
                </div>
              </div>
        </div>
    )
}

export default MessageSend
