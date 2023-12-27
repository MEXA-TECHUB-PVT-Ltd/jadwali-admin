import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Button,
  Modal,
  CircularProgress,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteModal from "./DeleteModel";
import BlockUser from "./users/BlockUser";
import { get } from "../../server/server";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import BoxStyle from "./StylesModal/BoxStyle";


const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
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
  const theme = useTheme();
  const handleOpenBlockModal = () => {
    setToastOpen(false);
    setIsDeleteModalOpen(true);
  };
  const location = useLocation();
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const op = JSON.parse(localStorage.getItem("detailModalOpen")) || null;
    if (!op) {
      // console.log("Close the open modal")
      setOpen && setOpen(false);
    }
  }, [open]);

  const getUserDetails = async () => {
    if (user) {
      setLoading(true);
      const { res, err } = await get(`/users/${user?.user_id}/details`);
      if (err) {
        console.error(err);
        setLoading(false);
      }
      if (res) {
        // console.log(res);
        setDetails(res?.result);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [user]);

  const body = (
    <BoxStyle>
      <Card className="sm:w-[550px] mx-5" sx={{ borderRadius: "30px" }}>
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
                {user?.full_name}
              </Typography>
              <div className="flex">
                <Typography color="textSecondary">Total Events:</Typography>
                <strong className="text-dark ms-2">Null</strong>
              </div>
            </Box>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <div className="flex flex-col">
                <Box mt={1}>
                  <Typography fontWeight="bold" gutterBottom>
                    Availability
                  </Typography>
                  <ul>
                    {details?.availability === null && (
                      <Typography variant="body2" mr={2}>
                        NO RESULT FOUND
                      </Typography>
                    )}

                    {details?.availability?.map((availability, index) => (
                      <li key={index}>
                        {availability.day}: {availability.start_time} -{" "}
                        {availability.end_time}
                      </li>
                    ))}
                  </ul>
                </Box>

                <Box mt={1} mr={2}>
                  <Typography fontWeight="bold" gutterBottom>
                    User Appointments
                  </Typography>
                  <ul>
                    {details?.user_appointments === null && (
                      <Typography variant="body2" mr={2}>
                        NO RESULT FOUND
                      </Typography>
                    )}
                    {details?.user_appointments?.map((appointment, index) => (
                      <li key={index}>
                        Name: {appointment.name}, Service ID:{" "}
                        {/* {appointment.service_id} */}
                      </li>
                    ))}
                  </ul>
                </Box>
                <Box mt={1}>
                  <Typography fontWeight="bold" gutterBottom>
                    User Services
                  </Typography>
                  <ul>
                    {details?.user_services === null && (
                      <Typography variant="body2">NO RESULT FOUND</Typography>
                    )}

                    {details?.user_services?.map((services, index) => (
                      <li key={index}>Name: {services.name}</li>
                    ))}
                  </ul>
                </Box>
              </div>
            )}
            {location.pathname === "/dashboard/subscribed-users" ? null : (
              <Button
                sx={{
                  backgroundColor: !user?.block_status ? "#FF5858" : "#00C342",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: !user?.block_status
                      ? "#FF5858"
                      : "#00C342",
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
            )}
          </CardContent>
        </CardContent>
      </Card>
    </BoxStyle>
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
      </div>
      <BlockUser
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        // setOpenDetailModal={setOpen}
        handleClose={handleDeleteCloseModal}
        user={user}
        fetchAllUsers={fetchAllUsers}
        setToastOpen={setToastOpen}
        toastOpen={toastOpen}
        handleCloseToast={handleCloseToast}
        setOpenDetail={handleClose}
      />
    </>
  );
};

export default UserDetailModel;
