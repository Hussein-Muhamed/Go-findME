import React, { useEffect, useState } from "react";
import "./Settings.css";
import Header from "./Header";
import InfoIcon from "@material-ui/icons/Info";
import { useStateValue } from "./StateProvider";
import { Button } from "@material-ui/core";
import axios from "axios"
import "./Search.css";
import Post from "./Post";

function Search() {
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    Search();
  }, []);

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      localStorage.setItem("file", reader.result);
    });
    
    setImage(reader.readAsDataURL(e.target.files[0]));
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log("Image: ", image);
    }
    console.log("Image: ", image);
  };



  const handleSubmit = (e) => {
    var bodyFormData = new FormData();
    bodyFormData.append('file', image);
     axios({
      method: "POST",
      url: "http://192.168.1.6:8080/api/recognize/image/",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
          console.log(response.data)
          alert(response.message);
      })
      .catch(function (error, response) {
        console.log(error.message);
        console.log(error.response);
        alert(response.message);
      });
      e.preventDefault();
    //   alert(response.message);
  };

  const Search = () => {
    axios({
        method: "get",
        url: `http://localhost:3000/posts/60e29487c3c00102b0e5bf06`
      })
      .then((response) => {
        console.log(response);
        setPosts([...response.data])
        console.log(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });  
  }

  

  return ( 
    <>
      <Header />
      <div className="setting">
        <div className="setting-left">
          <div className="option">
            <InfoIcon />
            <h3>Personal Information</h3>
          </div>
        </div>

        <div className="setting-right">
          <div className="setting-right-row">
            <label className="username">Select image to Search</label>
            <input type="file" onChange={handleChange} />
            <Button onClick={(handleSubmit)}type="submit" >Sumbit</Button>
            <br></br>
            <Button onClick={(Search)}type="Search" >Search</Button>
          </div>
          <div>
          {posts.map((post) => (
        <Post
          key={'post.data._id'}
          userName={post.owner}
          profilePic={post.image}
          message={post.description}
          timeStamp={post.createdAt}
          image={`http://localhost:3000/public/${post.image}`}
        />
      ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
