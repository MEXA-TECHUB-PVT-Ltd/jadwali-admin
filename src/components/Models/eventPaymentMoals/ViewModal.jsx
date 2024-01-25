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

const ViewModal = ({
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
        <Card sx={{ borderRadius: "30px", minWidth: "300px", boxShadow: 3 }}>
          <CardContent sx={{ p: 0, bgcolor: theme.palette.primary.main }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#C7AEDB", // Custom background color
                padding: theme.spacing(2),
                borderTopLeftRadius: "30px",
                borderTopRightRadius: "30px",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "500" }}>
                Details
              </Typography>
              <IconButton onClick={handleDetailModalClose}>
                <CancelIcon />
              </IconButton>
            </Box>
          </CardContent>

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: theme.spacing(3),
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <Typography variant="h6" sx={{ mb: 2 }} color="GrayText">
                  UserName:
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {detailData?.details?.user?.full_name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                  Event:{" "}
                  <strong>
                    {detailData?.details?.event?.name || "Not provided yet"}
                  </strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                  Deposit Price:{" "}
                  <strong>
                    {detailData?.details?.event?.deposit_price ||
                      "Not provided yet"}
                  </strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                  Event Price:{" "}
                  <strong>
                    {detailData?.details?.event?.event_price ||
                      "Not provided yet"}
                  </strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                  Duration:{" "}
                  <strong>
                    {detailData?.details?.event?.duration || "Not provided yet"}{" "}
                    Hour
                  </strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                  Pricing:{" "}
                  <strong>
                    {detailData?.tran_total || "0.00"}
                  </strong>
                </Typography>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <Typography sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                  Currency:{" "}
                  <strong>
                    {detailData?.cart_currency || "N"}
                  </strong>
                </Typography>
              </Grid> */}
            </Grid>
            <Box
              sx={{
                width: "100%",
                mt: 2,
                p: 2,
                borderRadius: "15px",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                Bank Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>Bank Name:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: theme.palette.text.primary }}>
                    {detailData?.details?.bank?.bank_name || "Not provided yet"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Account Name:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: theme.palette.text.primary }}>
                    {detailData?.details?.bank?.account_name ||
                      "Not provided yet"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Account Number:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: theme.palette.text.primary }}>
                    {detailData?.details?.bank?.account_number ||
                      "Not provided yet"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Account Holder Number:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: theme.palette.text.primary }}>
                    {detailData?.details?.bank?.account_holder_number ||
                      "Not provided yet"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
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

export default ViewModal;
