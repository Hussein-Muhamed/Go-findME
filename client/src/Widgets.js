import React from "react";
import "./Widgets.css";
import SearchIcon from "@material-ui/icons/Search";
import Contact from "./Contact";
import Avatar1 from "./images/avatar1.png";
import Avatar2 from "./images/avatar2.png";
import Avatar3 from "./images/avatar3.png";
import Avatar4 from "./images/avatar4.jpg";
import mAli from "./images/mAli.png";
import om from "./images/om.png";
import ChatIcon from "@material-ui/icons/Chat";

function Widgets(props) {
  return (
    <div className="widgets">
      <div className={`widget_to${props.top}`}>
        <div className="widget_topInfo">
          <h3>Trusted Contacts</h3>
          <input type="search" />
          <SearchIcon />
        </div>
        <Contact src={Avatar1} title="Ali Shreef" />
        <Contact src={Avatar2} title="Mohamed Ali" />
        <Contact src={Avatar3} title="Hussien Mohamed" />
        <Contact src={mAli} title="Marwa Ghitas" />
        <Contact src={om} title="Mohand Maher" />
        <Contact src={Avatar4} title="Omar Shedid" />
      </div>
      <div className="widget_bottom">
        <ChatIcon />
        <input type="text" placeholder="Type to start chat"></input>
      </div>
    </div>
  );
}

export default Widgets;
