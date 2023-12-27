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
  useTheme,
  Grid,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import BoxStyle from "../StylesModal/BoxStyle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const QueryModal = ({
  detailData,
  openDetailModal,
  setOpenDetailModal,
  handleDetailModalClose,
}) => {
  const handleCloseToast = () => {
    setToastOpen(false);
  };
  const theme = useTheme();

  const body = (
    <div>
      <BoxStyle>
        <Card className="sm:w-[550px] mx-5" sx={{ borderRadius: "30px" }}>
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
                Query Details
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Name
                  </Typography>
                  <Typography variant="body1">{detailData?.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{detailData?.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Message
                  </Typography>
                  <TextField
                    name="description"
                    variant="outlined"
                    value={detailData?.message}
                    fullWidth
                    multiline
                    InputProps={{
                      readOnly: true,
                      sx: {
                        borderRadius: "20px",
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                        "&.Mui-focused": {
                          backgroundColor: "rgba(0, 0, 0, 0.06)",
                        },
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.05)",
                        },
                      },
                    }}
                    rows={4}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </CardContent>
        </Card>
      </BoxStyle>
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
            // style: { opacity: 0.5, backgroundColor: "rgba(0, 0, 0, 1)" },
          },
        }}
        sx={{
          display: "flex", // Use flexbox for centering
          alignItems: "center", // Vertically center the modal
          justifyContent: "center", // Horizontally center the modal
          px: 2, // Apply some padding on the x-axis
          [theme.breakpoints.down("sm")]: {
            overflowY: "auto", // Add scroll on smaller screens if needed
          },
        }}
      >
        {body}
      </Modal>
    </div>
  );
};

export default QueryModal;
