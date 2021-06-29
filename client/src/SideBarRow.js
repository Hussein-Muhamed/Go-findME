import { Avatar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./SideBarRow.css";

function SideBarRow({ src, Icon, title }) {
  return (
    <div className="sidebarRow">
      {src && (
        <Link to='/profile'>
          <Avatar src={src} />
        </Link>
      )}
      {Icon && <Icon />}
      <Link className='title' style={{textDecoration:`none`}}>
        <h4>{title}</h4>
      </Link>
    </div>
  );
}

export default SideBarRow;
