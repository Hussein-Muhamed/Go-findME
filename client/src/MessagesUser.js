import React from "react";
import { Avatar } from "@material-ui/core";
import "./MessagesUser.css";
function MessagesUser() {
  return (
    <div className="message-user">
      <Avatar src={null} />
      <div className="info">
        <h3>userName1</h3>
        <p>ChatChatChatChatChat</p>
      </div>
    </div>
  );
}

export default MessagesUser;
