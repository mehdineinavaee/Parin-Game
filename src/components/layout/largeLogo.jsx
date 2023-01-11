import React from "react";
import { Link } from "react-router-dom";

const LargeLogo = () => {
  return (
    <React.Fragment>
      <Link to="/">
        <img
          src="assets/images/LogoParin.png"
          className="logo-light"
          alt="images"
        />
        <img
          src="assets/images/LogoParin.png"
          className="logo-dark"
          alt="images"
        />
      </Link>
    </React.Fragment>
  );
};
export default LargeLogo;
