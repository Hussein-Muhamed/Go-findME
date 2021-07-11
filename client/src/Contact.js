import { Avatar } from "@material-ui/core";
import React from "react";
import "./Contact.css";

function Contact({ src, title, phone }) {
  return (
    <div className="contact">
      <Avatar src={src} />
      <div className="info">
        <h3>{title}</h3>
        <label>{phone}</label>
      </div>
    </div>
  );
}

export default Contact;
