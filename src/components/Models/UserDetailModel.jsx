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
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteModal from "./DeleteModel";
import BlockUser from "./users/BlockUser";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const UserDetailModel = ({
  open,
  setOpen,
  handleClose,
  user,
  onToggleStatus,
  isDeleteModalOpen,
  handleDeleteCloseModal,
  setIsDeleteModalOpen,
  fetchAllUsers,
  setToastOpen,
  toastOpen,
  handleCloseToast,
}) => {
  const handleOpenBlockModal = () => {
    setToastOpen(false);
    setIsDeleteModalOpen(true);
  };

  const body = (
    <Box style={style}>
      <Card className="sm:w-[550px] w-[80%]" sx={{ borderRadius: "30px" }}>
        <CardContent className="p-0" sx={{ padding: 0 }}>
          <div className="px-5 py-3 flex justify-between items-center">
            <Typography
              sx={{
                m: 0,
                fontSize: "20px",
                margin: "0",
                fontWeight: "bold",
              }}
            >
              User Details
            </Typography>
            <IconButton aria-label="delete" onClick={handleClose}>
              <CancelIcon fontSize="inherit" />
            </IconButton>
          </div>
          <CardContent className="m-3">
            <Box className="flex flex-col items-center">
              <Avatar src="" sx={{ width: 60, height: 60, mb: 2 }} />
              <Typography
                variant="h6"
                gutterBottom
                color="rgba(108, 48, 156, 1)"
              >
                {user?.first_name}
              </Typography>
              <div className="flex">
                <Typography color="textSecondary">Total Events:</Typography>
                <strong className="text-dark ms-2">Null</strong>
              </div>
              <Button
                sx={{
                  backgroundColor: !user?.block_status ? "#FF5858" : "#00C342",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: !user?.block_status ? "#FF5858" : "#00C342",
                  },
                  borderColor: "inherit",
                  color: "white",
                  mt: 6,
                }}
                fullWidth
                onClick={handleOpenBlockModal}
              >
                {!user?.block_status ? "Block" : "Unblock"}
              </Button>
            </Box>
          </CardContent>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.16)" }}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="user-detail-modal-title"
          aria-describedby="user-detail-modal-description"
          slotProps={{
            backdrop: {
              style: { opacity: 0.5, backgroundColor: "rgba(0, 0, 0, 1)" },
            },
          }}
        >
          {body}
        </Modal>
      </div>
      <BlockUser
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        handleClose={handleDeleteCloseModal}
        user={user}
        fetchAllUsers={fetchAllUsers}
        setToastOpen={setToastOpen}
        toastOpen={toastOpen}
        handleCloseToast={handleCloseToast}
      />
    </>
  );
};

export default UserDetailModel;
