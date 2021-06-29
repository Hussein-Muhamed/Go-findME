import React from "react";
import Feed from "./Feed";
import Header from "./Header";
import "./Profile.css";
import SideBar from "./SideBar";
import { useStateValue } from "./StateProvider";
import Widgets from "./Widgets";

function Profile() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="profile">
      <>
      <Header />
      
      <div className="pro_body">
        <SideBar />
        <Feed decoration="r_hidden" cName="ds"/>
        <Widgets top="p" />
      </div>
    </>
    </div>
  );
}

export default Profile;
