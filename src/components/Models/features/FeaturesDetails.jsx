import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const FeatureDetails = ({
  detailData,
  openDetailModal,
  setOpenDetailModal,
  handleDetailModalClose,
}) => {
  const handleCloseToast = () => {
    setToastOpen(false);
  };

  const body = (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.16)" }}>
      <Box style={style}>
        <Card className="sm:w-[500px] w-[80%]" sx={{ borderRadius: "30px" }}>
          <CardContent className="p-0" sx={{ padding: 0 }}>
            <div className="mb-12 bg-[#C7AEDB] px-5 py-3 flex justify-between items-center">
              <Typography
                sx={{
                  m: 0,
                  fontSize: "20px",
                  color: "#6C309C",
                  margin: "0",
                  fontWeight: "medium",
                }}
              >
                Feature Details
              </Typography>
              <IconButton
                aria-label="delete"
                onClick={handleDetailModalClose}
                sx={{ padding: "0", color: "#6C309C" }}
              >
                <CancelIcon fontSize="inherit" />
              </IconButton>
            </div>
            <CardContent className="m-3">
              <TextField
                name="description"
                id="outlined-basic"
                variant="outlined"
                value={detailData?.description}
                fullWidth
                multiline
                readOnly={true}
                rows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    borderColor: "rgba(0, 0, 0, 0.04)",
                    borderWidth: "0px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.04)",
                  },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.04)", // Same color as non-focused state to make it seem like there's no focus
                  },
                  "&:hover": {
                    cursor: "default", // Prevent cursor change
                  },
                  p: 0,
                  borderRadius: "20px",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                }}
                size="small"
              />
            </CardContent>
          </CardContent>
        </Card>
      </Box>
    </div>
  );

  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.16)" }}>
      <Modal
        open={openDetailModal}
        onClose={handleDetailModalClose}
        aria-labelledby="user-detail-modal-title"
        aria-describedby="user-detail-modal-description"
        slotProps={{
          backdrop: {
            style: { opacity: 0.1, backgroundColor: "rgba(0, 0, 0, 0.5)" },
          },
        }}
      >
        {body}
      </Modal>
    </div>
  );
};

export default FeatureDetails;
