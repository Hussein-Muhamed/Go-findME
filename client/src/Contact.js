import { Avatar } from "@material-ui/core";
import React from "react";
import "./Contact.css";

function Contact({ src, title }) {
  return (
    <div className="contact">
      <Avatar src={src} />
      <h3>{title}</h3>
    </div>
  );
}

export default Contact;
