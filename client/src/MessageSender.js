import { Avatar, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import "./MessageSender.css";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import firebase from "firebase";

function MessageSender(props) {
  const fileSelectedHandler = event => {
    console.log(event.target.files[0]);
  }
  const [input, setinput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      message: input,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      userName: user.displayName,
      image: imageUrl,
    });
    setinput("");
    setImageUrl("");
  };

  return (
    <div className={`messageSende${props.decor}`}>
      <div className="messageSender_top">
        <Avatar src={user.photoURL} />
        <form>
          <input
            value={input}
            onChange={(e) => {
              setinput(e.target.value);
            }}
            className="messageSender_input"
            placeholder={`What's on your mind, ${user.displayName}?`}
          ></input>
          <input
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
            placeholder="image URL (Optional)"
          ></input>
          <button onClick={handleSubmit}>Hidden Button</button>
        </form>
      </div>
      <div className={`messageSender_bottom`}>
        <div className="messageSender_option">
          <VideocamIcon style={{ color: "Red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messageSender_option">
          
          <input
            onChange={fileSelectedHandler}
            accept="image/*"
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoLibraryIcon style={{ color: "green" }} />
            </IconButton>
          </label>
          <h3>Photo/Video</h3>
        </div>
        <div className="messageSender_option">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
