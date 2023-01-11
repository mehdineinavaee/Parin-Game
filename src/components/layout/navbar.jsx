import React from "react";
import SmallLogo from "./smallLogo";
import LargeMenu from "./largeMenu";
import SmallMenu from "./smallMenu";

const Navbar = () => {
  return (
    <React.Fragment>
      <div className="navbar-area">
        <SmallLogo />
        <LargeMenu />
        <SmallMenu />
      </div>
    </React.Fragment>
  );
};
export default Navbar;
