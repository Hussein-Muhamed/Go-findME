import { Avatar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./SideBarRow.css";
import Avatar1 from './images/avatar1.png'

function SideBarRow({ src, Icon, title }) {
  return (
    <div className="sidebarRow">
      {
        !Icon && (
          <Link to='/profile'>
            <Avatar src={src ? src : Avatar1} />
          </Link>
        )
      }
      {Icon && <Icon />}
      <Link className='title' style={{textDecoration:`none`}}>
        <h4>{title}</h4>
      </Link>
    </div>
  );
}

export default SideBarRow;
