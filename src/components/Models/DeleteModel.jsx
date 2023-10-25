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
  useTheme,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ToastModal from "./TostModal";
import { useLocation } from "react-router-dom";
import BoxStyle from "./StylesModal/BoxStyle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const DeleteModal = ({
  open,
  setOpen,
  handleClose,
  onDelete,
  title,
  paragraph,
  actionText,
  eventMessage,
  handleCloseToast,
  toastOpen,
  setToastOpen,
}) => {
  const location = useLocation();
const theme = useTheme();


  const body = (
    <>
      <ToastModal
        open={toastOpen}
        onClose={handleCloseToast}
        eventMessage={
          location.pathname === "/dashboard/features"
            ? "Feature Deleted Successfully"
            : eventMessage
        }
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
              {title}
            </Typography>
            <Typography color="GrayText" variant="body2">
              {paragraph}
            </Typography>
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
                sx={{
                  backgroundColor: "#6C309C",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: "#6C309C",
                  },
                  color: "#fff",
                  padding: "0 20px",
                  ml: 2,
                }}
                onClick={onDelete}
              >
                {actionText}
              </Button>
            </div>
          </CardContent>
        </Card>
      </BoxStyle>
    </>
  );

  const opLow = { opacity: 0.2 };
  const opHigh = { opacity: 0.5 };

  const backdropStyle = title === "Block User" ? opLow : opHigh;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="user-detail-modal-title"
      aria-describedby="user-detail-modal-description"
      slotProps={{
        backdrop: {
          style: { ...backdropStyle, backgroundColor: "rgba(0, 0, 0, 1)" },
        },
      }}
      sx={{
        display: "flex", // Use flexbox for centering
        alignItems: "center", // Vertically center the modal
        justifyContent: "center", // Horizontally center the modal // Apply some padding on the x-axis
        [theme.breakpoints.down("sm")]: {
          overflowY: "auto", // Add scroll on smaller screens if needed
        },
      }}
    >
      {body}
    </Modal>
  );
};

export default DeleteModal;
