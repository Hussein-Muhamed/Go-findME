import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Post.css";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import moment from 'moment'
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

function Post({ profilePic, userName, timeStamp, message, image }) {
  const [menu, setMenu] = useState("none");
  function moreOptions() {
    if (menu == "block") {
      setMenu("none");
    } else {
      setMenu("block");
    }
  }
  return (
    <div className="post">
      <div className="post_top">
        <Avatar src={profilePic} className="post_avatar" />
        <div className="post_info">
          <h3>{userName}</h3>
          <p>{moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
        <div className="more">
          <IconButton onClick={moreOptions}>
            <MoreHorizIcon />
          </IconButton>
          <div className="more-options" style={{ display: `${menu}` }}>
            <ul>
              <Link className="more-options-li" to="/profile">
                <li>Show Profile</li>
              </Link>
              <Link className="more-options-li" >
                <li>Star Post</li>
              </Link>
              <Link className="more-options-li" >
                <li>Trusted Friends</li>
              </Link>
            </ul>

          </div>
        </div>
      </div>
      <div className="post_bottom">
        <p>{message}</p>
      </div>
      <div className="post_image">
        <img src={image} alt="" />
      </div>
      <div className="post_options">
        <div className="post_option">
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className="post_option">
          <ChatBubbleOutlineIcon />
          <p>Comment</p>
        </div>
        <div className="post_option">
          <NearMeIcon />
          <p>Share</p>
        </div>
        <div className="post_option">
          <AccountCircleIcon />
          <ExpandMoreOutlinedIcon />
        </div>
      </div>
    </div>
  );
}

export default Post;
