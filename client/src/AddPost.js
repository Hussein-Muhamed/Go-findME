import React, { useState } from "react";
import "./AddPost.css";
import db, { storage } from "./firebase";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import Home from "./Home";
import { Link } from "react-router-dom";

function AddPost() {
  const [input, setinput] = useState("");
  const [inputAge, setinputAge] = useState("");
  const [inputHairColor, setinputHairColor] = useState("");
  const [inputEyesColor, setinputEyesColor] = useState("");
  const [inputSkinColor, setinputSkinColor] = useState("");
  const [inputMessage, setinputMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(false);
  const [url, setUrl] = useState("");
  const [{ user }, dispatch] = useStateValue();

  var arr = ["white","black"];
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  console.log("Image: ", image);
  const handleUpload = (e) => {
    e.preventDefault();
    setTimeout(function () {
      if (image == false) {
        alert("Image not uploaded!");
        e.preventDefault();
      } else {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                setUrl(url);
              });
          }
        );
      }
    }, 1000);
  };
  const handleSubmit = (e) => {
    if (url == "") {
      alert("Press on Upload Button First!");
      e.preventDefault();
    } else if (
      (input == "" ||
      inputHairColor == "" ||
      inputEyesColor == "" ||
      inputSkinColor == "" ||
      inputAge == "" ||
      parseInt(input) >= 0 ||
      isNaN(parseInt(input)) == false ||
      input.match(new RegExp("[0-9]")) !== null ||
      parseInt(input) < 0 ||
      parseInt(input) >= 0 ||
      parseInt(inputAge) <= 0 ||
      inputHairColor.match(new RegExp("[0-9]")) !== null ||
      inputEyesColor.match(new RegExp("[0-9]")) !== null ||
      inputSkinColor.match(new RegExp("[0-9]")) !== null) ||
      inputSkinColor.match(new RegExp("white|black")) == null
      
    ) {
      e.preventDefault();
      console.log(inputSkinColor.match(new RegExp("word1|word2")));
      
      console.log("error");
    } else {
      e.preventDefault();
      db.collection("posts").add({
        message:
          "Name: " +
          input +
          " Age: " +
          inputAge +
          " Hair Color: " +
          inputHairColor +
          " Eyes Color:  " +
          inputEyesColor +
          " Skin Color: " +
          inputSkinColor.toLowerCase() +
          "  |  " +
          inputMessage,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        profilePic: user.photoURL,
        userName: user.displayName,
        image: url,
      });
      setinputAge("");
      setinput("");
      setImageUrl("");
      setinputHairColor("");
      setinputEyesColor("");
      setinputSkinColor("");
      setinputMessage("");
      alert("Uploaded!");
    }
  };
  return (
    <div className="add-post">
      <Header />
      <div className="add_post-input">
        <h1>Add Post</h1>
        <form>
          <div className="childInfo">
            <h3>Child Info</h3>
            <input
              value={input}
              onChange={(e) => {
                setinput(e.target.value);
              }}
              className="messageSender_input"
              placeholder={`what is Child Name ?`}
            ></input>
            <input
              value={inputAge}
              onChange={(e) => {
                setinputAge(e.target.value);
              }}
              className="messageSender_input"
              placeholder={`what is Child Age ?`}
            ></input>
          </div>
          <div className="appearance">
            <h3>Child Appearance</h3>
            <input
              value={inputHairColor}
              onChange={(e) => {
                setinputHairColor(e.target.value);
              }}
              className="messageSender_input"
              placeholder={`what is Child Hair Color ?`}
            ></input>
            <input
              value={inputEyesColor}
              onChange={(e) => {
                setinputEyesColor(e.target.value);
              }}
              className="messageSender_input"
              placeholder={`what is Child Eyes Color ?`}
            ></input>
            <input
              value={inputSkinColor}
              onChange={(e) => {
                setinputSkinColor(e.target.value);
              }}
              className="messageSender_input messageSender_input_color"
              placeholder={`Skin Color ? (white / black)`}
            ></input>
          </div>
          <div className="loseDetails">
            <h3>Your Message</h3>
            <textarea
              value={inputMessage}
              onChange={(e) => {
                setinputMessage(e.target.value);
              }}
              className="messageSender_input"
              placeholder={`Please Type a message that explain how the child was lost/found ?`}
            ></textarea>
          </div>
          <input
            className="hiddenSubmit"
            value={url}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
            placeholder="image URL (Optional)"
          ></input>
          <input type="file" onChange={handleChange} />
          <h3>**Press on "Upload" button before "Add Post"**</h3>
          <button onClick={handleUpload}>Upload</button>
          <button onClick={(handleUpload, handleSubmit)}>Add Post</button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
