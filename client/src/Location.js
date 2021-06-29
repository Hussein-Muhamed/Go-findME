import React from "react";
import Header from "./Header";
import "./Location.css";

function Location() {
  return (
    <>
    <Header />
    <div className="location">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27622.23386308386!2d31.365598399999996!3d30.071861999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1624921764922!5m2!1sar!2seg"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
    </>
  );
}

export default Location;
