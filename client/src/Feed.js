import React, { useEffect, useState } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import StoryReel from "./StoryReel";
import profilePic from "./images/avatar1.png";
import BgPost from "./images/background.jpeg";
import db from "./firebase";
import Photo from "./Photo";

function Feed(props) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);
  return (
    <div className={`fee${props.cName}`}>
      <Photo cName={props.name} />
      <MessageSender decor={props.decoration} />
      {posts.map((post) => (
        <Post
          key={post.data.id}
          userName={post.data.userName}
          profilePic={post.data.profilePic}
          message={post.data.message}
          timeStamp={post.data.timeStamp}
          image={post.data.image}
        />
      ))}
    </div>
  );
}

export default Feed;
