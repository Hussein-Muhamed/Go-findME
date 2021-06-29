import React from "react";
import "./SideBar.css";
import SideBarRow from "./SideBarRow";
import ImageIcon from '@material-ui/icons/Image';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { useStateValue } from "./StateProvider";

function SideBar() {
  const[{user},dispatch]= useStateValue();
  return (
    <div className="sideBar">
      <SideBarRow src={user.photoURL} title={user.displayName}/>
      <SideBarRow Icon={ImageIcon} title='My Images' />
      <SideBarRow Icon={PeopleAltIcon} title='Friends' />
    </div>
  );
}

export default SideBar;
