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
  Alert,
} from "@mui/material";
import ToastModal from "../TostModal";
import { del, put } from "../../../server/server";
import { CircularProgress } from "@material-ui/core";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const DeleteFeatures = ({
  open,
  setOpen,
  handleClose,
  toastOpen,
  setToastOpen,
  handleCloseToast,
  currentFeature,
  fetchAllUsers,
  fetchFeatures,
}) => {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleDeleteFeature = async () => {
    setLoading(true);
    const { res, err } = await del(
      `/features/delete?feature_id=${currentFeature?.feature_id}`,
      null,
      null
    );

    if (err) {
      console.error(err);
      setError(err?.response?.data?.message);
      setLoading(false);
    }
    if (res) {
      setToastOpen(true);
      setError(null);
      if (fetchFeatures) {
        fetchFeatures();
      }
      setTimeout(() => {
        setOpen(false);
      }, 1000);
      setLoading(false);
    }
  };

  const body = (
    <>
      <ToastModal
        open={toastOpen}
        onClose={handleCloseToast}
        eventMessage="Feature Delete Successfully!"
      />
      <Box style={style}>
        <Card className="sm:w-[450px] w-[80%]" sx={{ borderRadius: "30px" }}>
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
              Delete Feature
            </Typography>
            <Typography color="GrayText" variant="body2">
              Do you really want to delete this user?
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
                  backgroundColor: "#6C309C",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: "#6C309C",
                  },
                  color: "#fff",
                  padding: "0 20px",
                  ml: 2,
                }}
                onClick={handleDeleteFeature}
              >
                {loading ? <CircularProgress size={24} /> : "Delete"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Box>
    </>
  );

  const opLow = { opacity: 0.2 };
  const opHigh = { opacity: 0.5 };

  // const backdropStyle = title === "Block User" ? opLow : opHigh;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="user-detail-modal-title"
      aria-describedby="user-detail-modal-description"
      slotProps={
        {
          // backdrop: {
          //   style: { ...backdropStyle, backgroundColor: "rgba(0, 0, 0, 1)" },
          // },
        }
      }
    >
      {body}
    </Modal>
  );
};

export default React.memo(DeleteFeatures);
