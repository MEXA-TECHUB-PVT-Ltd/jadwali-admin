import { CircularProgress } from "@mui/material";
import React from "react";

const Progress = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={24} />
    </div>
  );
};

export default Progress;
