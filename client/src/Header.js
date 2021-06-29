import React from "react";
import {useState} from "react";
import "./Header.css";
import logo from "./images/magnifying-glasses-png-247.png";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AddIcon from "@material-ui/icons/Add";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import { Avatar, IconButton } from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";

function Header(props) {
  const [{ user }, dispatch] = useStateValue();
  const [menu, setMenu] = useState("none")
 function Logout() {
  window.location.reload(false);
 }
 function moreOptions() {
   if (menu == "block") {
     setMenu("none");
   } else{
    setMenu("block");
   }
  
 }
  return (
    <>
      <div className="header">
        <div className="header_left">
          <img src={logo} alt={""} className="src" />
          <div className="header_input">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search on Go-Findme"
              className="text"
            />
          </div>
        </div>
        <div id="A" className="header_center">
          <div className={`header_option header_option-${props.cName}`}>
            <Link style={{ color: "grey" }} to="/">
              <HomeIcon fontSize="large" />
            </Link>
          </div>
          <div className="header_option">
            <Link style={{ color: "grey" }} to="/location">
              <LocationOnIcon fontSize="large" />
            </Link>
          </div>
          <div className="header_option">
            <Link style={{ color: "grey" }} to="/addpost">
              <AddIcon fontSize="large" />
            </Link>
          </div>
          <div className="header_option">
            <SupervisedUserCircleIcon fontSize="large" />
          </div>
        </div>
        <div className="header_right">
          <div>
            <IconButton>
              <AddIcon />
            </IconButton>
            <IconButton>
              <ForumIcon />
            </IconButton>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton onClick={moreOptions}>
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>
      </div>
      {/* tazbeet el window bta3t el more options */}
      <div className="more-options" style={{display:`${menu}`}}>
        <ul>
          <Link className="more-options-li" to="/profile">
            <li>Profile</li>
          </Link>
          <Link className="more-options-li"  to="/location">
            <li>Maps</li>
          </Link>
          <Link className="more-options-li"  to="/">
            <li>Trusted Friends</li>
          </Link>
          <Link className="more-options-li"  onClick={Logout} to="/">
            <li>Logout</li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Header;
