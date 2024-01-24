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
  Tooltip,
  Typography,
  TablePagination,
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

const FeedbackTable = ({ feedbacks, dashboard }) => {
  const [currentData, setCurrentData] = useState();
  const [detailData, setDetailData] = React.useState(null);
  const [modal, setModal] = React.useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        {dashboard ? (
          ""
        ) : (
          <Typography fontSize="25px" fontWeight="medium" color="#342E59">
            Feedbacks
          </Typography>
        )}
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
                Username
              </TableCell>
              <TableCell
                style={{ color: "#6C309C", minWidth: 170 }}
                sx={{ fontWeight: "bold" }}
                // align="center"
              >
                Comment
              </TableCell>
              <TableCell
                style={{ color: "#6C309C", minWidth: 170 }}
                sx={{ fontWeight: "bold" }}
                // align="center"
              >
                Rating
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
            {feedbacks
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((feedback, index) => (
                <TableRow hover key={feedback.id} tabIndex={-1}>
                  <TableCell padding="checkbox" sx={{}} align="center">
                    {index + 1}
                  </TableCell>

                  <TableCell style={{ verticalAlign: "middle" }}>
                    {feedback?.users?.full_name}
                  </TableCell>
                  <CommentCell comment={feedback?.comment} />
                  <CommentCell comment={feedback?.rating} />

                  <TableCell sx={{}}>
                    <Tooltip title="View">
                      <Visibility
                        sx={{ color: "rgba(0, 0, 0, 0.4)", fontSize: "20px" }}
                        className="cursor-pointer me-5"
                        onClick={() => handleModal(feedback)}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={feedbacks?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {feedbacks?.length > 0 && (
        <div>
          <FeedbackModal
            detailData={currentData}
            openDetailModal={modal}
            setOpenDetailModal={setModal}
            handleDetailModalClose={handleModalClose}
          />
        </div>
      )}
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

export default React.memo(FeedbackTable);
