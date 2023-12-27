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

const DeleteQuery = ({ open, handleClose, fetchQueries, data }) => {
  const [toastOpen, setToastOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const { res, err } = await del(`/queries/delete/${data?.id}`);

    if (err) {
      console.error(err);
      setError(err?.response?.data?.message);
      setLoading(false);
    }
    if (res) {
    //   setToastOpen(true);
      setLoading(false);
      setError(null);
      setTimeout(() => {
        // setOpen(false);
        handleClose();
      }, 1000);
      if (fetchQueries) {
        fetchQueries();
      }
    }
  };

  const body = (
    <>
      {/* <ToastModal
        open={toastOpen}
        onClose={handleCloseToast}
        eventMessage={`User ${
          status && status ? "Block" : "Unblock"
        } Successfully!`}
      /> */}
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
              Delete Query
            </Typography>
            <Typography color="GrayText" variant="body2">
              Do you really want to delete this query?
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
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "red",
                  "&.Mui-focused": {
                    backgroundColor: "rgba(0, 0, 0, 0.06)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                  },
                  color: "#fff",
                  padding: "0 20px",
                  ml: 2,
                }}
                onClick={handleDelete}
              >
                {loading ? <CircularProgress size={24} /> : "Delete"}
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

export default DeleteQuery;
