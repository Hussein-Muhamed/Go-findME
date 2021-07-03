import React, { useEffect, useState } from "react";
import "./SideBar.css";
import SideBarRow from "./SideBarRow";
import ImageIcon from '@material-ui/icons/Image';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { useStateValue } from "./StateProvider";

function SideBar() {
  const [data, setData] = useState(null)
  const[{user},dispatch]= useStateValue();
  useEffect(() => {
    if (localStorage.getItem('user')) {
      var data = JSON.parse(localStorage.getItem('user'));
      var d = {
        image: typeof data.user.avatar != 'undefined' ? data.user.avatar : null,
        name: data.user.userName
      }
      setData({...d});
    }
  },[])
  return (
    <div className="sideBar">
      {
        data && (
          <>
            <SideBarRow src={data.image} title={data.name}/>
            <SideBarRow Icon={ImageIcon} title={'kajlsfg'} />
            <SideBarRow Icon={PeopleAltIcon} title='Friends' />
          </>
        )
      }
    </div>
  );
}

export default SideBar;
