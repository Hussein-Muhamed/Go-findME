import React, { useState } from "react";
import "./AddPost.css";
import db, { storage } from "./firebase";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import Select from "react-select";
import Home from "./Home";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";

function AddPost() {
  const [input, setinput] = useState("");
  const [inputAge, setinputAge] = useState("");
  const [inputCity, setinputCity] = useState("");
  const [inputRegion, setinputRegion] = useState("");
  const [inputGender, setinputGender] = useState("");
  const [inputDescription, setinputDescription] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [addPost, setAddPost] = useState("none");
  const [{ user }, dispatch] = useStateValue();

  var arr = ["white", "black"];
  const age = [
    { label: "Child (1-15)", value: "Child" },
    { label: "Adult (15-35)", value: "Adult" },
    { label: "Elder (35-80)", value: "Elder" },
  ];
  const gender = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const missed = [
    { label: "Missed", value: "Missed" },
    { label: "Found", value: "Found" },
  ];
  const city = [
    { label: "Cairo", value: "Cairo" },
    { label: "Alex", value: "Alex" },
    { label: "Giza", value: "Giza" },
    { label: "Helwan", value: "Helwan" },
    { label: "Port Said", value: "Port Said" },
    { label: "Al Mansurah", value: "Al Mansurah" },
    { label: "Asyut", value: "Asyut" },
    { label: "Marsa Matruh", value: "Marsa Matruh" },
    { label: "Kafr ash Shaykh", value: "Kafr ash Shaykh" },
    { label: "Banha", value: "Banha" },
    { label: "Al Ghardaqah", value: "Al Ghardaqah" },
    { label: "Banī Suwayf", value: "Banī Suwayf" },
    { label: "Suhaj", value: "Suhaj" },
    { label: "Qina", value: "Qina" },
    { label: "Luxor", value: "Luxor" },
    { label: "Al Minya", value: "Al Minya" },
    { label: "Damanhur", value: "Damanhur" },
    { label: "Damietta", value: "Damietta" },
    { label: "Aswan", value: "Aswan" },
    { label: "Ismailia", value: "Ismailia" },
    { label: "Al Fayyum", value: "Al Fayyum" },
  ];
  const region = [
    { label: "Ain-Shams", value: "Ain-Shams" },
    { label: "15 May", value: "15 May" },
    { label: "Al Azbakeyah", value: "Al Azbakeyah" },
    { label: "Al Basatin", value: "Al Basatin" },
    { label: "Tebin", value: "Tebin" },
    { label: "El-Khalifa", value: "El-Khalifa" },
    { label: "Aldarb Alahmar", value: "Aldarb Alahmar" },
    { label: "Zawya al-Hamra", value: "Zawya al-Hamra" },
    { label: "El-Zaytoun", value: "El-Zaytoun" },
    { label: "Sahel", value: "Sahel" },
    { label: "El Salam", value: "El Salam" },
    { label: "Sayeda Zeinab", value: "Sayeda Zeinab" },
    { label: "Shorouk", value: "Shorouk" },
    { label: "El Daher", value: "El Daher" },
    { label: "New Cairo", value: "New Cairo" },
    { label: "El Marg", value: "El Marg" },
    { label: "Ezbet el Nakhl", value: "Ezbet el Nakhl" },
    { label: "Matareya", value: "Matareya" },
    { label: "Maadi", value: "Maadi" },
    { label: "Maasara", value: "Maasara" },
    { label: "Mokattam", value: "Mokattam" },
    { label: "Manyal", value: "Manyal" },
  ];

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      localStorage.setItem("image", reader.result);
    });

    setImage(reader.readAsDataURL(e.target.files[0]));
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log("Image: ", image);
    }
    console.log("Image: ", image);
  };
  // const handleSubmit = (e) => {
  //   var bodyFormData = new FormData();
  //   bodyFormData.append('image', image);
  // }
  const handleUpload = (e) => {
    var bodyFormData = new FormData();
    bodyFormData.append("file", image);
    axios({
      method: "POST",
      url: "http://192.168.1.2:8080/api/recognize/is_valid/image/",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        if (response.data.code == 200) {
          alert("file uploaded sucssfully");
          setAddPost("block");
        } else alert("No face Detected! \nPlease upload another photo!");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.message);
        console.log(error.response);
      });

    e.preventDefault();
  };

  const handleSubmit = (e) => {
    if (
      input == "" ||
      inputCity == "" ||
      inputRegion == "" ||
      inputGender == "" ||
      inputAge == "" ||
      parseInt(input) >= 0 ||
      isNaN(parseInt(input)) == false ||
      input.match(new RegExp("[0-9]")) !== null ||
      parseInt(input) < 0 ||
      parseInt(input) >= 0
    ) {
      e.preventDefault();
      alert("Enter valid Data!")
      console.log("error");
    } else {
      var bodyFormData = new FormData();
      bodyFormData.append("name", input);
      bodyFormData.append("age", inputAge);
      bodyFormData.append("city", inputCity);
      bodyFormData.append("gender", inputGender);
      bodyFormData.append("region", inputRegion);
      bodyFormData.append("typeofperson", type);
      bodyFormData.append(
        "description",
        "Name: " +
          input + 
          " " +
          "Age: " +
          inputAge +
          " " +
          "City: " +
          inputCity +
          " " +
          "Gender: " +
          inputGender +
          " " +
          "Region: " +
          inputRegion +
          " " +
          "Type of person: " +
          type +
          " " +
          "Description: " +
          inputDescription
      );
      bodyFormData.append("date", date);
      bodyFormData.append("image", image);
      axios({
        method: "post",
        url: "http://localhost:3000/post",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });
      e.preventDefault();
      setinputAge("");
      setinput("");
      setImageUrl("");
      setinputCity("");
      setinputRegion("");
      setinputGender("");
      setinputDescription("");
      alert("Uploaded!");
    }
  };
  function changeHandler(e) {
    setinputAge(e.value);
    console.log(e.value);
  }
  
  return (
    <div className="add-post">
      <Header />
      <div className="add_post-input">
        <h1>Add Post</h1>
        <form>
          <div className="childInfo">
            <h3>Person Info</h3>
            <input
              value={input}
              onChange={(e) => {
                setinput(e.target.value);
              }}
              className="messageSender_input"
              placeholder={`Name`}
            ></input>
            <div className="container">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <Select
                    value={inputAge}
                    onChange={changeHandler}
                    placeholder={inputAge ? inputAge : "Age"}
                    options={age}
                  />
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>
          </div>
          <div className="appearance">
            <h3>Information</h3>
            <div className="container">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <Select
                    value={inputCity}
                    onChange={(e) => {
                      setinputCity(e.value);
                    }}
                    placeholder={inputCity ? inputCity : "City"}
                    options={city}
                  />
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <Select
                    value={inputRegion}
                    onChange={(e) => {
                      setinputRegion(e.value);
                    }}
                    placeholder={inputRegion ? inputRegion : "Region"}
                    options={region}
                  />
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <Select
                    value={inputGender}
                    onChange={(e) => {
                      setinputGender(e.value);
                    }}
                    placeholder={inputGender ? inputGender : "Gender"}
                    options={gender}
                  />
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <Select
                    value={type}
                    onChange={(e) => {
                      setType(e.value);
                    }}
                    placeholder={type ? type : "Type"}
                    options={missed}
                  />
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="messageSender_input messageSender_input_color"
            ></input>
          </div>
          <div className="loseDetails">
            <h3>Description</h3>
            <textarea
              value={inputDescription}
              onChange={(e) => {
                setinputDescription(e.target.value);
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
          <input
            type="file"
            onClick={() => {
              setAddPost("none");
            }}
            onChange={handleChange}
          />
          {/* <FileBase64 onDone={({base64}) =>{
            setImage(base64)
          }}/> */}
          <h3>**Press on "Upload" button before "Add Post"**</h3>
          <button onClick={handleUpload}>Upload</button>
          <button onClick={handleSubmit} style={{ display: `${addPost}` }}>
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;