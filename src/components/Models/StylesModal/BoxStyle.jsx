import React from "react";
import { Box } from "@mui/material";


const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
};

const BoxStyle = ({ children }) => {
  return (
    <Box
      style={style}
      sx={{
        width: "100%", // Full width on smaller screens
        maxWidth: "550px", // Max width for larger screens
        mx: "auto", // Center the modal
        borderRadius: "30px",
      }}
    >
      {children}
    </Box>
  );
};

export default BoxStyle;
