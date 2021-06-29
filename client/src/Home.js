import React from "react";
import Feed from "./Feed";
import Header from "./Header";
import SideBar from "./SideBar";
import Widgets from "./Widgets";
import './Home.css';

function Home() {
  return (
    <>
      <Header cName='active'/>

      <div className="app_body">
        <SideBar />
        <Feed name="disabled" decoration="r_hidden" cName="d" />
        <Widgets />
      </div>
    </>
  );
}

export default Home;
