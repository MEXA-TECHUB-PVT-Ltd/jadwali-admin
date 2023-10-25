import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button, CircularProgress, TableHead, Tooltip } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import DiscountModal from "../Models/referral/DiscountModal";
import DetailModal from "../Models/referral/DetailModal";
import Progress from "../CommonProgress/Progress";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function ReferralTable({
  users,
  pendingUsers,
  approvedUsers,
  fetchUsers,
  loading,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDiscount, setOpenDiscount] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState();
  const [toastOpen, setToastOpen] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);

  const handleOpenDiscount = (user) => {
    setCurrentUser(user);
    setOpenDiscount(true);
    setToastOpen(false);
  };

  const handleCloseDiscount = () => {
    setOpenDiscount(false);
  };

  const handleViewModal = (user) => {
    setCurrentUser(user);
    setOpenDetail(true);
  };
  const handleCloseViewMmodal = () => {
    setOpenDetail(false);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {loading ? (
        <Progress />
      ) : (
        <Paper sx={{ width: "100%", mb: 2, borderRadius: "20px" }}>
          <TableContainer sx={{ borderRadius: "10px", overflow: 'auto', width: "100%" }}>
              <Table
                table-layout="fixed"
                word-wrap="nowrap"
              // sx={{ minWidth: "250px" }}
              aria-label="custom pagination table"
            >
              <TableHead style={{ backgroundColor: "#F4E9FD" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 120, color: "#6C309C" }}
                  >
                    USERS
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#6C309C", minWidth: 120 }}
                    sx={{ fontWeight: "bold" }}
                  >
                    REFERRAL LINK
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#6C309C", minWidth: 120 }}
                    sx={{ fontWeight: "bold" }}
                  >
                    Referred Users
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#6C309C", minWidth: 120 }}
                    sx={{ fontWeight: "bold" }}
                  >
                    Converted Users
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#6C309C", minWidth: 120 }}
                    sx={{ fontWeight: "bold" }}
                  >
                    Discount Received
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#6C309C", minWidth: 120 }}
                    sx={{ fontWeight: "bold" }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? users?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : users
                )?.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row" align="center">
                      {row.full_name}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {import.meta.env.VITE_BASE_URL}/auth/signup
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {row.pendingreferralscount}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {row.approvedreferralscount}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {row.discountusers || 0}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      <div className="flex items-center gap-2">
                        <Tooltip title="View">
                          <Visibility
                            sx={{
                              color: "rgba(0, 0, 0, 0.4)",
                              fontSize: "20px",
                            }}
                            className="cursor-pointer me-5"
                            onClick={() => handleViewModal(row)}
                          />
                        </Tooltip>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#6C309C",
                            borderRadius: "20px",
                            fontSize: "0.75rem", // Adjust font size as per your design
                            textTransform: "none", // Optional: if you want to keep the text case as is
                            "&:hover": {
                              backgroundColor: "#6C309C",
                            },
                            width: "130px",
                          }}
                          onClick={() => handleOpenDiscount(row)}
                        >
                          Give Discount
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow style={{ display: "flex", alignItems: "center" }}>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                    colSpan={3}
                    count={users?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    style={{ flexShrink: 0, marginRight: "auto" }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <DiscountModal
            open={openDiscount}
            setOpen={setOpenDiscount}
            handleClose={handleCloseDiscount}
            currentUser={currentUser}
            fetchUsers={fetchUsers}
            toastOpen={toastOpen}
            setToastOpen={setToastOpen}
          />
          <DetailModal
            open={openDetail}
            setOpen={setOpenDetail}
            handleClose={handleCloseViewMmodal}
            user={currentUser}
          />
        </Paper>
      )}
    </>
  );
}
