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
import { useState, useEffect, useCallback } from "react";
import UserDetailModel from "../Models/UserDetailModel";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import ToastModal from "../Models/TostModal";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditFeaturesModal from "../Models/EditFeaturesModal";
import DeleteModal from "../Models/DeleteModel";
import DeleteFeatures from "../Models/features/DeleteFeatures";

const FeaturesTable = ({
  features,
  updateSelectedFeatures,
  fetchFeatures,
  toastOpen,
  setToastOpen,
}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [currentUsers, setCurrentUsers] = useState(features);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [editData, setEditData] = React.useState();
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [currentFeature, setCurrentFeature] = React.useState(null);

  const theme = useTheme();

  const rowsPerPage = 10;

  const location = useLocation();

  const handleIsEditModalOpen = useCallback((data) => {
    setEditData(data);
    setIsEditModalOpen(true);
    setToastOpen(false);

    true;
  }, []);

  const handleIsEditModalClose = useCallback(() => {
    setIsEditModalOpen(false);
    setToastOpen(false);
  }, []);

  const handleOpenDeleteModal = useCallback((feature) => {
    setCurrentFeature(feature);
    setIsDeleteModalOpen(true);
    setToastOpen(false);
  }, []);

  const handleDeleteModal = useCallback(() => {
    setToastOpen(true);
    setTimeout(() => {
      setToastOpen(false);
      setIsDeleteModalOpen(false);
    }, 500);
  }, []);

  const handleDeleteCloseModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setToastOpen(false);
  }, []);

  const handleOpenModal = useCallback((status) => {
    setSelectedStatus(status);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setToastOpen(false);
  }, []);

  React.useEffect(() => {
    const selectedFeaturesData = features.filter((feature) =>
      selectedUsers.includes(feature.id)
    );
    updateSelectedFeatures(selectedFeaturesData);
  }, [selectedUsers, features, updateSelectedFeatures]);

  const handleSelectAllClick = useCallback((event) => {
    if (event.target.checked) {
      const newSelecteds = features.map((n) => n.id);
      setSelectedUsers(newSelecteds);
      return;
    }
    setSelectedUsers([]);
  }, []);

const handleClick = useCallback(
  (event, id) => {
    event.preventDefault();
    event.stopPropagation();

    const selectedIndex = selectedUsers.indexOf(id);
    let newSelected = [];

    // Toggle logic: If the user is already selected, unselect it.
    // If the user is not selected, select it.
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedUsers, id);
    } else {
      newSelected = [
        ...selectedUsers.slice(0, selectedIndex),
        ...selectedUsers.slice(selectedIndex + 1),
      ];
    }

    const clickedUser = features?.find((user) => user.feature_id === id);
    if (clickedUser) {
      setSelectedStatus(clickedUser.status);
    }

    setSelectedUsers(newSelected);
  },
  [selectedUsers]
);


  const isSelected = (id) => selectedUsers.indexOf(id) !== -1;

  const maxPages = Math.ceil(features.length / rowsPerPage);

  const handleNextPage = () => {
    if (page < maxPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // const paginatedUsers = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const paginationData = features.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const numAdjacentButtons = 1;
  const handleCloseToast = () => {
    setToastOpen(false);
  };

  return (
    <div>
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
              <TableCell padding="checkbox" sx={{ minWidth: 170 }}>
                <Checkbox
                  color="primary"
                  onChange={handleSelectAllClick}
                  style={{ color: "#C4C4C4" }}
                />
              </TableCell>
              <TableCell
                style={{ color: "#6C309C", minWidth: 170 }}
                sx={{ fontWeight: "bold" }}
              >
                Features Description
              </TableCell>
              <TableCell
                style={{ color: "#6C309C", minWidth: 170 }}
                sx={{ fontWeight: "bold" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginationData.map((feature) => (
              <TableRow
                hover
                key={feature.id}
                role="checkbox"
                tabIndex={-1}
                selected={isSelected(feature.feature_id)}
                onClick={(event) => handleClick(event, feature.feature_id)}
              >
                <TableCell padding="checkbox" sx={{}}>
                  <Checkbox
                    color="primary"
                    checked={isSelected(feature.feature_id)}
                    style={{ color: "#C4C4C4" }}
                    onChange={(event) => {
                      event.stopPropagation(); 
                      handleClick(event, feature.feature_id);
                    }}
                  />
                </TableCell>

                <TableCell sx={{}}>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <Avatar src="" style={{ marginRight: "8px" }} />
                    {feature?.description}
                  </div>
                </TableCell>

                <TableCell sx={{}}>
                  <BorderColorIcon
                    sx={{
                      color: "#6C309C",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleIsEditModalOpen(feature)}
                  />
                  <DeleteIcon
                    sx={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleOpenDeleteModal(feature)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserDetailModel
        open={isModalOpen}
        handleClose={handleCloseModal}
        status={selectedStatus}
      />
      <EditFeaturesModal
        open={isEditModalOpen}
        handleClose={handleIsEditModalClose}
        setOpen={handleIsEditModalClose}
        feature={editData}
        fetchFeatures={fetchFeatures}
      />
      <DeleteFeatures
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        handleClose={handleDeleteCloseModal}
        currentFeature={currentFeature}
        fetchFeatures={fetchFeatures}
        setToastOpen={setToastOpen}
        toastOpen={toastOpen}
        handleCloseToast={handleCloseToast}
      />
    </div>
  );
};

export default React.memo(FeaturesTable);
