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
  TablePagination,
  Tooltip,
  Typography,
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
import Progress from "../CommonProgress/Progress";

import FeedbackModal from "../Models/FeedbackModal";
import AddIcon from "@mui/icons-material/Add";
import AddFaq from "../Models/faq/AddFaq";
import FAQsModal from "../Models/faq/FAQsModal";
import EditFaq from "../Models/faq/EditFaq";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import DeleteFaq from "../Models/faq/DeleteFaq";

const FAQsTable = ({ faqs, fetchFAQs }) => {
  const [currentData, setCurrentData] = useState();
  const [detailData, setDetailData] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedFeatures, setSelectedFeatures] = React.useState([]);
  const [features, setFeatures] = React.useState([]);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleIsAddModalOpen = React.useCallback(() => {
    setIsAddModalOpen(true);
    setToastOpen(false);
  }, []);

  const handleIsAddModalClose = React.useCallback(() => {
    setIsAddModalOpen(false);
    setToastOpen(false);
  }, []);

  const handleIsEditModalOpen = React.useCallback((data) => {
    setCurrentData(data);
    setIsEditModalOpen(true);
    setToastOpen(false);
  }, []);

  const handleIsEditModalClose = React.useCallback(() => {
    setIsEditModalOpen(false);
    setToastOpen(false);
  }, []);

  const handleIsDeleteModalOpen = React.useCallback((data) => {
    setCurrentData(data);
    setIsDeleteModalOpen(true);
    setToastOpen(false);
  }, []);

  const handleIsDeleteModalClose = React.useCallback(() => {
    setIsDeleteModalOpen(false);
    setToastOpen(false);
  }, []);

  const handleModal = (data) => {
    setCurrentData(data);
    setModal(true);
  };
  const handleModalClose = (data) => {
    setModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Typography fontSize="25px" fontWeight="medium" color="#342E59">
          FAQs
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6C309C",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "#6C309C",
            },
          }}
          onClick={() => handleIsAddModalOpen()}
        >
          <AddIcon sx={{ marginRight: "10px" }} />
          Add
        </Button>
      </div>
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
                Questions
              </TableCell>
              <TableCell
                style={{ color: "#6C309C", minWidth: 170 }}
                sx={{ fontWeight: "bold" }}
                // align="center"
              >
                Answers
              </TableCell>
              <TableCell
                style={{ color: "#6C309C", minWidth: 170 }}
                sx={{ fontWeight: "bold" }}
                // align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faqs
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((faq, index) => (
                <TableRow hover key={faq.id} tabIndex={-1}>
                  <TableCell padding="checkbox" sx={{}} align="center">
                    {index + 1}
                  </TableCell>

                  <CommentCell comment={faq?.question} />
                  <CommentCell comment={faq?.answer} />

                  <TableCell sx={{}}>
                    <div className="flex">
                      <Tooltip title="View">
                        <Visibility
                          sx={{ color: "rgba(0, 0, 0, 0.4)", fontSize: "20px" }}
                          className="cursor-pointer me-5"
                          onClick={() => handleModal(faq)}
                        />
                      </Tooltip>
                      <Tooltip title="Edit">
                        <EditIcon
                          sx={{ color: "rgba(0, 0, 0, 0.4)", fontSize: "20px" }}
                          className="cursor-pointer me-5"
                          onClick={() => handleIsEditModalOpen(faq)}
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Delete
                          sx={{ color: "rgba(0, 0, 0, 0.4)", fontSize: "20px" }}
                          className="cursor-pointer me-5"
                          onClick={() => handleIsDeleteModalOpen(faq)}
                        />
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={faqs?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {faqs?.length > 0 && (
        <div>
          <FAQsModal
            detailData={currentData}
            openDetailModal={modal}
            setOpenDetailModal={setModal}
            handleDetailModalClose={handleModalClose}
          />
        </div>
      )}
      <AddFaq
        open={isAddModalOpen}
        handleClose={handleIsAddModalClose}
        setOpen={setIsAddModalOpen}
        fetchFAQs={fetchFAQs}
      />
      <EditFaq
        open={isEditModalOpen}
        handleClose={handleIsEditModalClose}
        setOpen={setIsAddModalOpen}
        fetchFAQs={fetchFAQs}
        data={currentData}
      />
      <DeleteFaq
        open={isDeleteModalOpen}
        handleClose={handleIsDeleteModalClose}
        // setOpen={setIsAddModalOpen}
        fetchFAQs={fetchFAQs}
        data={currentData}
      />
    </div>
  );
};

const CommentCell = ({ comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 50;

  if (!comment) return null;

  const isLongComment = comment.length > MAX_LENGTH;
  const displayedComment =
    isExpanded || !isLongComment
      ? comment
      : `${comment.substring(0, MAX_LENGTH)}...`;

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TableCell style={{ verticalAlign: "middle" }}>
      {displayedComment}
    </TableCell>
  );
};

export default React.memo(FAQsTable);
