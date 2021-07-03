import React, { useEffect, useState } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import StoryReel from "./StoryReel";
import profilePic from "./images/avatar1.png";
import BgPost from "./images/background.jpeg";
import db from "./firebase";
import Photo from "./Photo";
import axios from "axios";

function Feed(props) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchData();
    // db.collection("posts")
    //   .orderBy("timeStamp", "desc")
    //   .onSnapshot((snapshot) =>
    //     setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    //   );
  }, []);
  const fetchData = () => {
    axios
    .get("http://localhost:3000/posts")
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
    <div className={`fee${props.cName}`}>
      <Photo cName={props.name} />
      <MessageSender decor={props.decoration} />
      {posts.map((post) => (
        <Post
          key={'post.data._id'}
          userName={post.owner}
          profilePic={'post.data.profilePic'}
          message={post.description}
          timeStamp={post.createdAt}
          image={`http://localhost:3000/public/${post.image}`}
        />
      ))}
    </div>
  );
}

export default Feed;
