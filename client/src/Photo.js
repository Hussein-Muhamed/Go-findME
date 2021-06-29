import React from "react";
import "./Photo.css";
import { useStateValue } from "./StateProvider";
import CoverPic from './images/hannah.png'

function Photo(props) {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className={`${props.cName} profile_`}>
      <div className="profile_cover">
          <img src={CoverPic} />
      </div>
      <div className="profile_photo">
        <img src={user.photoURL} />
        <h3>{user.displayName}</h3>
      </div>
    </div>
  );
}

export default Photo;
