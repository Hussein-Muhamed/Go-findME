import React, { useEffect, useState } from "react";
import "./Settings.css";
import Header from "./Header";
import InfoIcon from "@material-ui/icons/Info";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import FindReplaceIcon from "@material-ui/icons/FindReplace";
import { useStateValue } from "./StateProvider";
import { Button } from "@material-ui/core";
import axios from "axios";
import "./Search.css";
import Post from "./Post";

function Search() {
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  const [pid, setPid] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = () => {
    console.log("fetchData Function!");
    axios
      .get(`http://localhost:3000/posts/${pid}`)
      .then((response) => {
        setPosts([response.data]);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      localStorage.setItem("file", reader.result);
    });

    setImage(
      reader.readAsDataURL(e.target.files[0])
        ? reader.readAsDataURL(e.target.files[0])
        : ""
    );
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log("Image: ", image);
    }
    console.log("Image: ", image);
  };

  const handleSubmit = (e) => {
    var bodyFormData = new FormData();
    bodyFormData.append("file", image);
    axios({
      method: "POST",
      url: "http://192.168.1.2:8080/api/recognize/image/",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        //   console.log(response.data)
        var pids = [response.data.pids];
        pids.forEach((e) => {
          console.log(e);
          setPid([e]);
        });
        //   console.log(pids)
        if(response.data.code == 422){
          alert("No face detected!");
        }
        else
          alert("Image Recognized sucssfully");
      })
      .catch(function (error, response) {
        console.log(error.message);
        console.log(error.response);
        alert("Error!");
      });

    //   alert(response.message);
  };

  const Search = (e) => {
    axios({
      method: "GET",
      url: `http://localhost:3000/posts/${pid}`,
    })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setPosts([response.data]);
        // console.log(pid[0].map((e)=> {
        //   console.log(JSON.stringify(e));
        // }));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="setting">
        <div className="setting-left">
          <div className="option">
            <FindReplaceIcon />
            <h3>Searching For Person</h3>
          </div>
        </div>

        <div className="setting-right">
          <div className="setting-right-row">
            <label className="username">Select image to Search</label>
            <input type="file" onChange={handleChange} />
            <Button onClick={handleSubmit} type="submit">
              Sumbit
            </Button>
            <br></br>
            <Button onClick={fetchData} type="Search">
              Search
            </Button>
          </div>
          <div className="searched-post">
            {posts.map((post) => (
              <Post
                key={"post.data._id"}
                userName={post.owner}
                profilePic={"post.data? post.data: profilePic"}
                message={post.description}
                timeStamp={post.createdAt}
                image={`http://localhost:3000/public/${post.image}`}
              />
            ))}
          </div>
          <p>
            {pid.map((p)=>{
              <p>{p}</p>
            })}
          </p>
        </div>
      </div>
    </>
  );
}

export default Search;
