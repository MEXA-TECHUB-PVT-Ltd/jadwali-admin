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
  Tooltip
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
import FeatureDetails from "../Models/features/FeaturesDetails";

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
  const [detailData, setDetailData] = React.useState(null);
  const [openDetailModal, setOpenDetailModal] = React.useState(false);

  const handleDetailModalOpen = (features) => {
    setDetailData(features);
    setOpenDetailModal(true);
  }

  const handleDetailModalClose = () => { 
setOpenDetailModal(false);
  }

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
              <TableCell
                padding="checkbox"
                sx={{ minWidth: 170 }}
                align="center"
              >
                #
              </TableCell>
              <TableCell
                style={{ color: "#6C309C", minWidth: 170 }}
                sx={{ fontWeight: "bold" }}
                // align="center"
              >
                Features Description
              </TableCell>
              <TableCell
                style={{ color: "#6C309C", minWidth: 170 }}
                sx={{ fontWeight: "bold" }}
                // align="center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginationData.map((feature, index) => (
              <TableRow hover key={feature.id} tabIndex={-1}>
                <TableCell padding="checkbox" sx={{}} align="center">
                  {index + 1}
                </TableCell>

                <TableCell align="center" style={{ verticalAlign: "middle" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      maxWidth: "200px",
                    }}
                  >
                    <Avatar
                      src=""
                      style={{ marginRight: "8px", flexShrink: 0 }}
                    />
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flexBasis: "0%",
                        flexGrow: 1,
                        flexShrink: 1,
                      }}
                    >
                      {feature?.description}
                    </div>
                  </div>
                </TableCell>

                <TableCell sx={{}}
                  // align="center"
                >
                  <BorderColorIcon
                    sx={{
                      color: "#6C309C",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleIsEditModalOpen(feature)}
                  />
                  <DeleteIcon
                    sx={{
                      color: "red",
                      cursor: "pointer",
                      marginRight: "20px",
                    }}
                    onClick={() => handleOpenDeleteModal(feature)}
                  />
                  <Tooltip text="view">
                    <Visibility
                      sx={{ color: "rgba(0, 0, 0, 0.4)", fontSize: "20px" }}
                      className="cursor-pointer me-5"
                      onClick={() => handleDetailModalOpen(feature)}
                    />
                  </Tooltip>
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
      <FeatureDetails
        detailData={detailData}
        openDetailModal={openDetailModal}
        setOpenDetailModal={setOpenDetailModal}
        handleDetailModalClose={handleDetailModalClose}
      />
    </div>
  );
};

export default React.memo(FeaturesTable);
