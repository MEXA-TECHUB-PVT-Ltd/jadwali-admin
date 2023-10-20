import React from "react";
import UserTable from "./UserTable";
import { users } from "../../utils/dashboard";
import { Box, Button, Typography, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { get, post } from "../../server/server";

const CommonTable = ({ title, status }) => {
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [error, setError] = React.useState("");
  const [allUsers, setAllUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);

  const rowsPerPage = 10;

  const fetchAllUsers = async () => {
    const { res, err } = await get("/users/get");
    if (err) {
      console.error(err);
    }
    if (res) {
      setAllUsers(res.result);
    }
  };



  const handleNextPage = () => {
    if (page < maxPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const numAdjacentButtons = 1;

  const handleSearch = async () => {
    if (searchTerm === "") {
      console.error("Query search is not defined");
    }
    const { res, err } = await post("/search", null, null, {
      text: searchTerm,
      type: "users",
    });
    if (err) {
      console.error(err);
      setError(err?.response?.data?.message);
    }
    if (res) {
      setFilteredUsers(res.result);
      setError("");
      setPage(1);
    }
  };

  React.useEffect(() => {
    if (searchTerm === "") {
      fetchAllUsers();
    } else {
      handleSearch();
    }
  }, [searchTerm]);
  const maxPages = Math.ceil(
    (searchTerm ? filteredUsers.length : allUsers.length) / rowsPerPage
  );
  return (
    <>
      <div className="flex justify-between items mb-5">
        <Typography fontSize="25px" fontWeight="medium" color="#342E59">
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "0 5px",
            borderWidth: "1px",
            borderColor: "gray",
          }}
        >
          <SearchIcon
            sx={{
              fontSize: "20px",
              color: "#959595",
            }}
          />
          <InputBase
            placeholder="Search…"
            sx={{ pl: 1, fontSize: "14px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </div>
      {error && (
        <div className="error-message">
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        </div>
      )}
      {!error && (
        <>
          {searchTerm === "" ? (
            <UserTable
              users={allUsers}
              status={status}
              page={page}
              handlePageChange={handlePageChange}
              fetchAllUsers={fetchAllUsers}
            />
          ) : (
            <UserTable
              users={filteredUsers}
              status={status}
              error={error}
              page={page}
              handlePageChange={handlePageChange}
              fetchAllUsers={fetchAllUsers}
            />
          )}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            marginTop="1rem"
          >
            <span>
              Showing
              {(page - 1) * rowsPerPage + 1}
              to
              {Math.min(
                page * rowsPerPage,
                searchTerm ? filteredUsers?.length : allUsers?.length
              )}
              of
              {searchTerm ? filteredUsers?.length : allUsers?.length}
              data
            </span>
            <Box>
              <Button
                variant="contained"
                disabled={page <= 1}
                onClick={handlePreviousPage}
                sx={{
                  backgroundColor: page <= 1 ? "grey" : "#6C309C",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: page <= 1 ? "grey" : "#6C309C",
                  },
                  borderColor: "inherit",
                  color: "white",
                }}
              >
                Previous
              </Button>

              {[...Array(maxPages)].map((_, index) => {
                if (
                  index + 1 >= page - numAdjacentButtons &&
                  index + 1 <= page + numAdjacentButtons
                ) {
                  return (
                    <Button
                      key={index}
                      variant="contained"
                      color={page === index + 1 ? "primary" : "secondary"}
                      onClick={() => setPage(index + 1)}
                      sx={{
                        backgroundColor:
                          page === index + 1 ? "#FFFFFF" : "#6C309C",
                        borderRadius: "20PX",
                        height: "32px",
                        width: "32px",
                        margin: "0 5px",
                        color: page === index + 1 ? "#6C309C" : "#FFFFFF",
                        "&:hover": {
                          backgroundColor:
                            page === index + 1
                              ? "rgba(0, 0, 0, 0.04)"
                              : "#6C309C",
                        },
                        padding: 0,
                      }}
                      size="small"
                    >
                      {index + 1}
                    </Button>
                  );
                }
                return null;
              })}

              <Button
                variant="outlined"
                disabled={page >= maxPages}
                onClick={handleNextPage}
                sx={{
                  backgroundColor: page >= maxPages ? "grey" : "#6C309C",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: page >= maxPages ? "grey" : "#6C309C",
                  },
                  borderColor: "inherit",
                  color: "#FFFFFF",
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default CommonTable;
