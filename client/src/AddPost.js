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
import FileBase64 from "react-file-base64" 

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
  const [image, setImage] = useState(false);
  const [url, setUrl] = useState("");
  const [{ user }, dispatch] = useStateValue();

  var arr = ["white", "black"];
  const age = [
    { label: "Child", value: "Child" },
    { label: "Adult", value: "Adult" },
    { label: "Elder", value: "Elder" },
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
  ];
  const region = [
    { label: "Ain-Shams", value: "Ain-Shams" },
    { label: "Masr-Al-Gadeda", value: "Masr-Al-Gadeda" },
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
  
  // const handleChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };
  // console.log("Image: ", image);
  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   setTimeout(function () {
  //     if (image == false) {
  //       alert("Image not uploaded!");
  //       e.preventDefault();
  //     } else {
  //       alert(
  //         "1) Make Sure That The Photo is Clear \n 2) The Photo Cannot be rotated \n 3) The Face must be appeared clearly"
  //       );
  //       const check = {
  //         // name: input,
  //         // age: inputAge,
  //         // city: inputCity,
  //         // gender: inputGender,
  //         // region: inputRegion,
  //         // date: date,
  //         // description: inputDescription,
  //         // typeofperson: type,
  //         image: image,
  //       };
  //       e.preventDefault();
  //       axios
  //         .post("http://localhost:3000/post", check)
  //         .then((response) => {
  //           console.log(response);
  //         })
  //         .catch(function (error) {
  //           // handle error
  //           console.log(error);
  //         });
  //       // const uploadTask = storage.ref(`images/${image.name}`).put(image);
        // uploadTask.on(
        //   "state_changed",
        //   (snapshot) => {},
        //   (error) => {
        //     console.log(error);
        //   },
        //   () => {
        //     storage
        //       .ref("images")
        //       .child(image.name)
        //       .getDownloadURL()
        //       .then((url) => {
        //         setUrl(url);
        //       });
        //   }
        // );
  //     }
  //   }, 1000);
  // };
  const handleSubmit = (e) => {
    // if (url == "") {
    //   alert("Press on Upload Button First!");
    //   e.preventDefault();
    // } 
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
      // parseInt(inputAge) <= 0 ||
      // inputHairColor.match(new RegExp("[0-9]")) !== null ||
      // inputEyesColor.match(new RegExp("[0-9]")) !== null ||
      // inputSkinColor.match(new RegExp("[0-9]")) !== null ||
      // inputSkinColor.match(new RegExp("white|black")) == null
    ) {
      e.preventDefault();
      console.log("error");
    } else {
      var bodyFormData = new FormData();

      bodyFormData.append('name', input);
      bodyFormData.append('age', inputAge);
      bodyFormData.append('city', inputCity);
      bodyFormData.append('gender', inputGender);
      bodyFormData.append('region', inputRegion);
      bodyFormData.append('typeofperson', type);
      bodyFormData.append('description', inputDescription);
      bodyFormData.append('date', date);
      bodyFormData.append('image', image);
      axios({
        method: "post",
        url: "http://localhost:3000/post",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
      e.preventDefault();
      // axios
      //   .post("http://localhost:3000/post",check)
      //   .then((response) => {
      //     console.log(response);

      //     // console.log(response.data.user.userName);
      //     // if (
      //     //   user == response.data.user.email &&
      //     //   user1 == response.data.user.password
      //     // ) {
      //     //   dispatch({
      //     //     type: actionTypes.SET_USER,
      //     //     user: response.data.user.userName,
      //     //   });
      //     // } else{
      //     //   setWarning("block");
      //     // }
      //   })
      //   .catch(function (error) {
      //     // handle error
      //     console.log(error);
      //   });
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
            <h3>Child Info</h3>
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
                    placeholder="Age"
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
                    placeholder="City"
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
                    placeholder="Region"
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
                    placeholder={inputGender ? inputGender : "select gender"}
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
                    placeholder="Type"
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
          <input type="file" onChange={handleChange} />
          {/* <FileBase64 onDone={({base64}) =>{
            setImage(base64)
          }}/> */}
          <h3>**Press on "Upload" button before "Add Post"**</h3>
          {/* <button onClick={handleUpload}>Upload</button> */}
          <button onClick={(handleSubmit)}>Add Post</button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;

// {"file":imagefile}
// {}