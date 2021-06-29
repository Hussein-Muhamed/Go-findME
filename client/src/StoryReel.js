import React from "react";
import Story from "./Story";
import "./StoryReel.css";
import Avatar1 from "./images/avatar1.png";
import Avatar2 from "./images/avatar2.png";
import Avatar3 from "./images/avatar3.png";
import mAli from "./images/mAli.png";
import om from "./images/om.png";
import Bg from "./images/Spotlight.jpg";

function StoryReel() {
  return (
    <div className="storyReel">
      <Story profileSrc={Avatar1} title="Ali Shreef" image={Bg} />
      <Story profileSrc={Avatar2} title="Hussien Mohamed" image={Bg} />
      <Story profileSrc={Avatar3} title="Marwa Ghitas" image={Bg} />
      <Story profileSrc={mAli} title="Mohamed Ali" image={Bg} />
      <Story profileSrc={om} title="Mohanad" image={Bg} />
      {/*Story*/}
      {/*Story*/}
      {/*Story*/}
    </div>
  );
}

export default StoryReel;
