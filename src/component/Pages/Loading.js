import { Box } from "@mui/material";
import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box>
          <ReactLoading type="spin" color="#0000FF" height={200} width={100} />
        </Box>
      </div>
    </>
  );
}
