import React from "react";
import { Link } from "react-router-dom";

const SmallLogo = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="mobile-nav">
          <div className="logo">
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SmallLogo;
