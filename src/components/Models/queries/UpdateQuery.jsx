import React, { useCallback } from "react";
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
  Alert,
  useTheme,
  Grid,
  CardActions,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@material-ui/core";
import BoxStyle from "../StylesModal/BoxStyle";
import ToastModal from "../TostModal";
import { post, put } from "../../../server/server";

const SubscriptionSchema = Yup.object().shape({
  question: Yup.string().required("Required"),
  answer: Yup.string().required("Required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const UpdateQueryStatus = ({ open, handleClose, fetchQueries, data }) => {
  const [loadingConnected, setLoadingConnected] = React.useState(false);
  const [loadingDismissed, setLoadingDismissed] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const theme = useTheme();

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  const updateStatus = useCallback(
    async (buttonType) => {
      const status = buttonType === "connected" ? "connected" : "dismissed";
      if (buttonType === "connected") {
        setLoadingConnected(true);
      } else {
        setLoadingDismissed(true);
      }

      const { res, err } = await put("/queries/update", null, null, {
        id: data?.id,
        status,
      });

      if (err) {
        console.error(err);
        setLoadingConnected(false);
        setLoadingDismissed(false);
        setError(err?.response?.data?.message);
      } else if (res) {
        setToastOpen(true);
        setLoadingConnected(false);
        setLoadingDismissed(false);
        setError(false);
        setTimeout(() => {
          handleClose();
          if (fetchQueries) {
            fetchQueries();
          }
        }, 1000);
      }
    },
    [data?.id, fetchQueries, handleClose]
  );

  const body = (
    <div>
      <ToastModal
        open={toastOpen}
        onClose={handleCloseToast}
        eventMessage={"Status Updated Successfully"}
      />
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
                Update Details
              </Typography>
              <IconButton
                aria-label="delete"
                onClick={handleClose}
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
                  <Typography variant="body1">{data?.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{data?.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Status
                  </Typography>
                  <Typography variant="body1">{data?.status}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Message
                  </Typography>
                  <TextField
                    name="description"
                    variant="outlined"
                    value={data?.message}
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
          <CardActions>
            <Button
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "#6C309C",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "#6C309C",
                },
                color: "#fff",
              }}
              // onClick={handleConnectedClick}
              onClick={() => updateStatus("connected")}
            >
              {loadingConnected ? <CircularProgress size={24} /> : "Connected"}
            </Button>
            <Button
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "#6C309C",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "#6C309C",
                },
                color: "#fff",
              }}
              // onClick={handleDismissedClick}
              onClick={() => updateStatus("dismissed")}
            >
              {loadingDismissed ? <CircularProgress size={24} /> : "Dismissed"}
            </Button>
          </CardActions>
        </Card>
      </BoxStyle>
    </div>
  );

  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.16)" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="user-detail-modal-title"
        aria-describedby="user-detail-modal-description"
        slotProps={{
          backdrop: {
            style: { opacity: 0.1, backgroundColor: "rgba(0, 0, 0, 0.5)" },
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

export default UpdateQueryStatus;
