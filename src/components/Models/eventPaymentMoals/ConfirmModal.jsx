import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Button,
  Modal,
  Alert,
  useTheme,
} from "@mui/material";
import ToastModal from "../TostModal";
import { del, put } from "../../../server/server";
import { CircularProgress } from "@material-ui/core";
import BoxStyle from "../StylesModal/BoxStyle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const ConfirmModal = ({ open, handleClose, fetchFAQs, data }) => {
  const [toastOpen, setToastOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const { res, err } = await put(
      `/payment/updateUserPaymentStatus`,
      null,
      null, {
        id: data?.id,
        status: "paid",
      }
    );

    if (err) {
      console.error(err);
      setError(err?.response?.data?.message);
      setLoading(false);
    }
    if (res) {
      setToastOpen(true);
      setLoading(false);
      setError(null);
      setTimeout(() => {
        // setOpen(false);
        handleClose();
        if (fetchFAQs) {
          fetchFAQs();
        }
      }, 1000);
    }
  };

  const body = (
    <>
      <ToastModal
        open={toastOpen}
        onClose={handleCloseToast}
        eventMessage={`Paid status updated Successfully!`}
      />
      <BoxStyle>
        <Card className="sm:w-[550px] mx-5" sx={{ borderRadius: "30px" }}>
          <CardContent className="p-0" sx={{ m: 2 }}>
            <Typography
              sx={{
                mb: 1,
                fontSize: "20px",
                color: "#6C309C",
                margin: "0",
                fontWeight: "bold",
              }}
            >
              Confirmation Payment
            </Typography>
            <Typography color="GrayText" variant="body2">
              Did you paid the payment to user?
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 5 }}>
                {error}
              </Alert>
            )}
            <div className="flex mt-7 justify-end">
              <Button
                onClick={handleClose}
                sx={{
                  color: "#6C309C",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6C309C",
                  color: "#fff",
                }}
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Yes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </BoxStyle>
    </>
  );

  const opLow = { opacity: 0.2 };
  const opHigh = { opacity: 0.5 };

  const backdropStyle = opLow;

  return (
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.16)" }}>
      <Modal
        open={open}
        onClose={handleClose}
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

export default ConfirmModal;
