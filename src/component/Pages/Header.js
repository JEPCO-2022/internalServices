import React from "react";
import logoWide from "../Images/jepco.png";

function Header() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img style={{ width: "450px", height: "15%" }} src={logoWide} alt="Company Logo" />
    </div>
  );
}

export default Header;
