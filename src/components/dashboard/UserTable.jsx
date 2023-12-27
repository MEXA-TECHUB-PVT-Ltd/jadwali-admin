import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Paper,
  Avatar,
  Box,
  Pagination,
  Typography,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";
import UserDetailModel from "../Models/UserDetailModel";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import ToastModal from "../Models/TostModal";
import * as React from "react";
import BlockUser from "../Models/users/BlockUser";
import Progress from "../CommonProgress/Progress";
import { SERVER_URL } from "../../baseUrl";

const UserTable = ({
  users,
  status,
  error,
  page,
  handlePageChange,
  fetchAllUsers,
  loading,
}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUsers, setCurrentUsers] = useState(users);
  const [toastOpen, setToastOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blockUser, setBlockUser] = useState(null);
  const navigate = useNavigate()
  const handleOpenDeleteModal = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setBlockUser(user);
    setToastOpen(false);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    const op = JSON.parse(localStorage.getItem("detailModalOpen")) || null;
    if (!op) {
      setIsModalOpen(false);
    }
  }, [isModalOpen]);

  const theme = useTheme();

  const rowsPerPage = 10;

  const location = useLocation();

  const handleOpenModal = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("detailModalOpen", JSON.stringify(true));
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = React.useCallback(() => {
    localStorage.removeItem("currentUser");
    localStorage.setItem("detailModalOpen", JSON.stringify(false));
    setIsModalOpen(false);
  }, []);

  const isSelected = (id) => selectedUsers.indexOf(id) !== -1;

  const numAdjacentButtons = 1;
  const handleCloseToast = () => {
    setToastOpen(false);
  };

  const handleDeleteCloseModal = () => {
    setIsDeleteModalOpen(false);
    localStorage.removeItem("currentUser");
  };

  return (
    <div>
      {loading ? (
        <Progress />
      ) : (
        <Paper sx={{ width: "100%", mb: 2, borderRadius: "20px" }}>
          <TableContainer sx={{ borderRadius: "10px" }}>
            <Table aria-labelledby="tableTitle">
              <TableHead style={{ backgroundColor: "#F4E9FD" }}>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{ minWidth: 120, color: "#6C309C" }}
                  >
                    NO
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ color: "#6C309C", minWidth: 120 }}
                    sx={{ fontWeight: "bold" }}
                  >
                    USER
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ color: "#6C309C", minWidth: 120 }}
                    sx={{ fontWeight: "bold" }}
                  >
                    EMAIL ADDRESS
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ color: "#6C309C", minWidth: 120 }}
                    sx={{ fontWeight: "bold" }}
                  >
                    TOTAL EVENTS
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ color: "#6C309C", minWidth: 120 }}
                    sx={{ fontWeight: "bold" }}
                  >
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ position: "relative" }}>
                {(typeof users === "function" ? users() : users)?.map(
                  (user, index) => (
                    <TableRow
                      hover
                      key={user.id}
                      role="checkbox"
                      tabIndex={-1}
                      selected={isSelected(user.id)}
                    >
                      <TableCell align="left" sx={{}}>
                        {index + 1}
                      </TableCell>

                      <TableCell align="left" sx={{}}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <Avatar
                            src={`${SERVER_URL}/public/uploads/${user?.upload_details?.filename}`}
                            style={{ marginRight: "8px" }}
                          />
                          {user.full_name}
                        </div>
                      </TableCell>
                      <TableCell align="left" sx={{}}>
                        {user.email}
                      </TableCell>
                      <TableCell align="left" sx={{}}>
                        {user.event_count || "Null"}
                      </TableCell>
                      <TableCell align="left">
                        <Tooltip title="View">
                          <Visibility
                            sx={{
                              color: "rgba(0, 0, 0, 0.4)",
                              fontSize: "20px",
                            }}
                            className="cursor-pointer me-5"
                            onClick={() => {
                              navigate(`/dashboard/user-details/${user.id}`);
                              // if (
                              //   location.pathname === "/dashboard/all-users"
                              // ) {
                              //   handleOpenModal(user);
                              // } else {
                              //   handleOpenModal(user);
                              // }
                            }}
                          />
                        </Tooltip>
                        {location.pathname === "/dashboard/all-users" ||
                        location.pathname === "/dashboard" ||
                        location.pathname === "/" ? (
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: user.block_status
                                ? "#FF5858"
                                : "#00C342",
                              "&:hover": {
                                backgroundColor: !user.block_status
                                  ? "#00C342"
                                  : "#FF5858",
                              },
                              marginRight: "10px",
                              width: "100px",
                            }}
                            size="small"
                            onClick={() => handleOpenDeleteModal(user)}
                          >
                            {user.block_status === false
                              ? "Unblock"
                              : "Block" || "Null"}
                          </Button>
                        ) : (
                          ""
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      <>
        {/* <Pagination
        onChange={handlePageChange}
        page={page}
        sx={{ display: "none" }}
      /> */}
        <UserDetailModel
          open={isModalOpen}
          setOpen={setIsModalOpen}
          handleClose={handleCloseModal}
          user={selectedUser}
          // onToggleStatus={handleToggleStatusFromModal}
          handleDeleteCloseModal={handleDeleteCloseModal}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          fetchAllUsers={fetchAllUsers}
          setToastOpen={setToastOpen}
          toastOpen={toastOpen}
          handleCloseToast={handleCloseToast}
        />
        <BlockUser
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          handleClose={handleDeleteCloseModal}
          user={blockUser}
          fetchAllUsers={fetchAllUsers}
          setToastOpen={setToastOpen}
          toastOpen={toastOpen}
          handleCloseToast={handleCloseToast}
          setOpenDetailedModal={setIsModalOpen}
        />
      </>
    </div>
  );
};

export default UserTable;
