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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";
import UserDetailModel from "../Models/UserDetailModel";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import ToastModal from "../Models/TostModal";
import * as React from "react";
import BlockUser from "../Models/users/BlockUser";

const UserTable = ({
  users,
  status,
  error,
  page,
  handlePageChange,
  fetchAllUsers,
}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  //   const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUsers, setCurrentUsers] = useState(users);
  const [toastOpen, setToastOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blockUser, setBlockUser] = useState(null);

  const handleOpenDeleteModal = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setBlockUser(user);
    setToastOpen(false);
    setIsDeleteModalOpen(true);
  };

  const theme = useTheme();

  const rowsPerPage = 10;

  const location = useLocation();

  const toggleUserStatus = (userId) => {
    const updatedUsers = currentUsers.map((user) => {
      if (user.id === userId) {
        const newStatus = user.status === "Block" ? "Unblock" : "Block";
        setToastMessage(
          `User ${
            newStatus === "Block" ? "blocked" : "unblocked"
          } successfully!`
        );
        return {
          ...user,
          status: newStatus,
        };
      }
      return user;
    });

    setCurrentUsers(updatedUsers);

    if (toastOpen) {
      setToastOpen(false);
    }

    setTimeout(() => {
      setToastOpen(true);
    }, 100);
  };

  const handleOpenModal = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    setSelectedUser(user);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    localStorage.removeItem('currentUser');
    setIsModalOpen(false);
  };

  const isSelected = (id) => selectedUsers.indexOf(id) !== -1;

  const maxPages = Math.ceil(users.length / rowsPerPage);

  const paginatedUsers = users.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
    );
    
    const numAdjacentButtons = 1;
    const handleCloseToast = () => {
      setToastOpen(false);
    };
    
    const handleDeleteCloseModal = () => {
      setIsDeleteModalOpen(false);
      localStorage.removeItem('currentUser');
  };

  return (
    <div>
      {/* <ToastModal
        open={toastOpen}
        onClose={handleCloseToast}
        eventMessage={toastMessage}
      /> */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          width: "100%",
          maxWidth: "100%",
          overflowX: "scroll",
        }}
      >
        <Table sx={{ minWidth: "250px" }}>
          <TableHead style={{ backgroundColor: "#F4E9FD" }}>
            <TableRow>
              <TableCell align="left" sx={{ minWidth: 120, color: "#6C309C" }}>
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
              {status && (
                <TableCell
                  align="left"
                  style={{ color: "#6C309C" }}
                  sx={{ fontWeight: "bold" }}
                >
                  Status
                </TableCell>
              )}
              <TableCell
                align="left"
                style={{ color: "#6C309C", minWidth: 120 }}
                sx={{ fontWeight: "bold" }}
              >
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(location.pathname === "/" || location.pathname === "/dashboard"
              ? users.slice(0, 10)
              : paginatedUsers
            ).map((user, index) => (
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
                    <Avatar src="" style={{ marginRight: "8px" }} />
                    {user.first_name}
                  </div>
                </TableCell>
                <TableCell align="left" sx={{}}>
                  {user.email}
                </TableCell>
                <TableCell align="left" sx={{}}>
                  {user.events || "Null"}
                </TableCell>
                {status && (
                  <TableCell align="left" sx={{}}>
                    {user.payment ? (
                      <div
                        style={{
                          backgroundColor:
                            user.payment === "Unpaid" ? "#FF5858" : "#00C342",
                          borderRadius: "10px",
                          borderColor: "inherit",
                          color: "white",
                          marginTop: "10px",
                          padding: "6px 16px",
                          // display: 'inline-block',
                          fontWeight: "bold",
                          width: "100px",
                          textAlign: "center",
                        }}
                      >
                        NULL
                      </div>
                    ) : (
                      "NULL"
                    )}
                  </TableCell>
                )}

                <TableCell align="left">
                  <Visibility
                    sx={{ color: "rgba(0, 0, 0, 0.4)", fontSize: "20px" }}
                    className="cursor-pointer me-5"
                    onClick={() => {
                      if (location.pathname === "/dashboard/all-users") {
                        handleOpenModal(user);
                      } else {
                        handleOpenModal(user);
                      }
                    }}
                  />
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        // ... other props
        onChange={handlePageChange}
        page={page}
        sx={{ display: "none" }}
      />
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
      />
    </div>
  );
};

export default UserTable;
