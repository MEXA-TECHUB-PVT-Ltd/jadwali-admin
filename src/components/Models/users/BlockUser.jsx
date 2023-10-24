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
} from "@mui/material";
import ToastModal from "../TostModal";
import { put } from "../../../server/server";
import { CircularProgress } from "@material-ui/core";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const BlockUser = ({
  open,
  setOpen,
  handleClose,
  toastOpen,
  setToastOpen,
  handleCloseToast,
  user,
  fetchAllUsers,
  setOpenDetailModal,
  setOpenDetail,
  setOpenDetailedModal,
}) => {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState();
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  const handleBlockStatus = async () => {
    setLoading(true);
    const { res, err } = await put("/users/updateBlockStatus", null, null, {
      block_status: !currentUser?.block_status,
      user_id: currentUser?.user_id,
    });

    if (err) {
      console.error(err);
      setError(err?.response?.data?.message);
      setLoading(false);
    }
    if (res) {
      setToastOpen(true);
      setLoading(false);
      setError(null);
      setStatus(res?.result.block_status);
      localStorage.removeItem("currentUser");
      const op = JSON.parse(localStorage.getItem("detailModalOpen")) || null;
      if (op) {
        console.log("Close it");
        localStorage.setItem("detailModalOpen", false);
      }
      if (typeof setOpenDetail === "function") {
        setOpenDetail();
      }
      setOpenDetailedModal(false);

      if (fetchAllUsers) {
        fetchAllUsers();
      }
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    }
  };

  const body = (
    <>
      <ToastModal
        open={toastOpen}
        onClose={handleCloseToast}
        eventMessage={`User ${
          status && status ? "Block" : "Unblock"
        } Successfully!`}
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
              {currentUser?.block_status ? "Unblock" : "Block"} User
            </Typography>
            <Typography color="GrayText" variant="body2">
              Do you really want to{" "}
              {currentUser?.block_status ? "Unblock" : "Block"} this user?
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
                  backgroundColor: !currentUser?.block_status
                    ? "#FF5858"
                    : "#00C342",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: !currentUser?.block_status
                      ? "#FF5858"
                      : "#00C342",
                  },
                  color: "#fff",
                  padding: "0 20px",
                  ml: 2,
                }}
                onClick={handleBlockStatus}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : currentUser?.block_status ? (
                  "Unblock"
                ) : (
                  "Block"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Box>
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
    >
      {body}
    </Modal>
  );
};

export default BlockUser;
