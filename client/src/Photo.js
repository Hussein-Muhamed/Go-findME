import React from "react";
import "./Photo.css";
import { useStateValue } from "./StateProvider";
import CoverPic from './images/hannah.png'
import Avatar1 from './images/avatar1.png'

function Photo(props) {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className={`${props.cName} profile_`}>
      <div className="profile_cover">
          <img src={CoverPic} />
      </div>
      <div className="profile_photo">
        <img src={user.avatar? user.avatar:Avatar1} />
        <h3>{user.userName}</h3>
      </div>
    </div>
  );
}

export default Photo;
