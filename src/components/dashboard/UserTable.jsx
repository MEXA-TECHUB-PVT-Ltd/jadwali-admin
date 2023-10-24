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

  useEffect(() => {
    const op = JSON.parse(localStorage.getItem("detailModalOpen")) || null;
    if (!op) {
      console.log("NOT false");
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
    localStorage.removeItem("currentUser");
  };

  const getDisplayedUsers = () => {
    switch (location.pathname) {
      case "/":
      case "/dashboard":
        return users.slice(0, 10);
      case "/dashboard/subscribed-users":
        return users
          .filter((user) => user.payment)
          .slice((page - 1) * rowsPerPage, page * rowsPerPage);
      default:
        return paginatedUsers;
    }
  };

  return (
    <div>
      <Paper sx={{ width: "100%", mb: 2, borderRadius: "20px" }}>
        <TableContainer sx={{ borderRadius: "10px" }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
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
            <TableBody>
              {getDisplayedUsers()?.map((user, index) => (
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
                      {user.full_name}
                    </div>
                  </TableCell>
                  <TableCell align="left" sx={{}}>
                    {user.email}
                  </TableCell>
                  <TableCell align="left" sx={{}}>
                    {user.events || "Null"}
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title="View">

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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Pagination
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
        setOpenDetailedModal={setIsModalOpen}
      />
    </div>
  );
};

export default UserTable;
