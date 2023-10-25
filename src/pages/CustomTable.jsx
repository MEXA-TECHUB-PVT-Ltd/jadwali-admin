import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, TableHead, TableSortLabel } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const headCells = [
  { id: "username", label: "Username" },
  { id: "articles", label: "Articles" },
  { id: "podcasts", label: "Podcasts" },
  { id: "liveStreams", label: "Live Streams" },
  { id: "actions", label: "Actions" },
];


function EnhancedTableHead({
  onSelectAllClick,
  numSelected,
  rowCount,
}) {
  return (
    <TableHead sx={{ backgroundColor: "#E6FFFF" }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            {headCell.id === "checkbox" ? (
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            ) : (
              <TableSortLabel>
                {headCell.label}
                <Box component="span" sx={"visuallyHidden"}></Box>
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



function EnhancedTable({ searchQuery }) {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const rows = [
        {
          user_id: 1,
          username: "john_doe",
          articles: 10,
          podcasts: 5,
          liveStreams: 2,
        },
        {
          user_id: 2,
          username: "jane_doe",
          articles: 8,
          podcasts: 3,
          liveStreams: 4,
        },
        {
          user_id: 3,
          username: "mike_jones",
          articles: 15,
          podcasts: 6,
          liveStreams: 1,
        },
        {
          user_id: 4,
          username: "sarah_smith",
          articles: 12,
          podcasts: 7,
          liveStreams: 3,
        },
        {
          user_id: 5,
          username: "chris_johnson",
          articles: 9,
          podcasts: 2,
          liveStreams: 6,
        },
        {
          user_id: 6,
          username: "kelly_brown",
          articles: 7,
          podcasts: 4,
          liveStreams: 5,
        },
        // ... add as many rows as you need
      ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, borderRadius: "20px" }}>
          <TableContainer sx={{ borderRadius: "10px" }}>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                rowCount={rows.length}
              />

              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.user_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      key={"row?.name"}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row?"
                        padding="default"
                        align="center"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Avatar
                          src=""
                          style={{ marginRight: "8px", marginLeft: "20px" }}
                        />
                        {"row?.username"}
                      </TableCell>
                      <TableCell align="center" style={{ width: "15%" }}>
                        {"row?.articles"}
                      </TableCell>{" "}
                      <TableCell align="center" style={{ width: "15%" }}>
                        {"row?.podcasts"}
                      </TableCell>{" "}
                      <TableCell align="center" style={{ width: "15%" }}>
                        {"row?.liveStreams"}
                      </TableCell>{" "}
                      <TableCell align="center" style={{ width: "15%" }}>
                        <Tooltip title="View">
                          <VisibilityIcon
                            sx={{ color: "#7D74DE", cursor: "pointer" }}
                            // onClick={() => handleViewClick(row)}
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
    </Box>
  );
}

export default React.memo(EnhancedTable);
