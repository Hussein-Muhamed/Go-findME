import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import Header from "./Header";
import "./Profile.css";
import SideBar from "./SideBar";
import { useStateValue } from "./StateProvider";
import Widgets from "./Widgets";
import axios from "axios"
import Photo from "./Photo";
import MessageSender from "./MessageSender";
import Post from "./Post";


function Profile(props) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/posts/me",
      headers: {
      "Authorization" : localStorage.getItem('token'),
    },
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
    // <div className="profile">
    //   <>
    //   <Header />
    //   <div className="pro_body">
    //     <SideBar />
    //     <Feed decoration="r_hidden" cName="ds"/>
    //     <Widgets top="p" />
    //   </div>
    // </>
    // </div>
    <div className="profile">
      <>
      <Header />
      <div className="pro_body">
         <SideBar />
         <div className={`fee${props.cName}`}>
      <Photo cName={props.name} />
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
</div>
    </>
    </div>
  );
}


export default Profile;
