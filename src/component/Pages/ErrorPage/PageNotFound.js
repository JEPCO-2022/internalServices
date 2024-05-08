import React from "react";
import image from "../../images/cross-icon.png";
import { Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variat="subtitle2" style={{ color: "black", marginLeft: 2 }}>
        Page Not Found 404
      </Typography>
      <br />
      <br />
      <br />
      <img
        alt="Page Not Found"
        src={image}
        style={{ maxWidth: "100%", height: "65vh" }}
      />
      <br />
    </div>
  );
};

export default PageNotFound;
