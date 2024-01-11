import React, { useEffect } from "react";
import { users } from "../../utils/dashboard";
import { Box, Button, Typography, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FeaturesTable from "../../components/dashboard/FeaturesTable";
// import { features } from '../../utils/featuresData';

import AddIcon from "@mui/icons-material/Add";
import AddFeaturesModal from "../../components/Models/AddFeaturesModal";
import { Link, useLocation } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { get } from "../../server/server";

const Features = () => {
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [selectedFeatures, setSelectedFeatures] = React.useState([]);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [features, setFeatures] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleIsAddModalOpen = React.useCallback(() => {
    setIsAddModalOpen(true);
    setToastOpen(false);
  }, []);

  const handleIsAddModalClose = React.useCallback(() => {
    setIsAddModalOpen(false);
    setToastOpen(false);
  }, []);

  const fetchFeatures = async () => {
    const { res, err } = await get("features/get?limit=200&page=1");
    if (res) {
      // console.log(res);
      setFeatures(res?.results);
    }
    if (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);


  const rowsPerPage = 10;

  const maxPages = Math.ceil(users.length / rowsPerPage);

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

  const filteredUsers = features?.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="flex justify-between items mb-5">
        <Typography fontSize="25px" fontWeight="medium" color="#342E59">
            <Typography>Features</Typography>
        </Typography>
        <div className="flex">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px",
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "0 5px",
              borderWidth: "1px",
              borderColor: "gray",
              marginRight: "15px",
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
              sx={{ pl: 1 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
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
      </div>

      <FeaturesTable
        features={features}
        updateSelectedFeatures={setSelectedFeatures}
        fetchFeatures={fetchFeatures}
        toastOpen={toastOpen}
        setToastOpen={setToastOpen}
        filteredUsers={filteredUsers}
        loading={loading}
      />

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
          {Math.min(page * rowsPerPage, users.length)}
          of
          {users.length}
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
                    backgroundColor: page === index + 1 ? "#FFFFFF" : "#6C309C",
                    borderRadius: "20PX",
                    height: "32px",
                    width: "32px",
                    margin: "0 5px",
                    color: page === index + 1 ? "#6C309C" : "#FFFFFF",
                    "&:hover": {
                      backgroundColor:
                        page === index + 1 ? "rgba(0, 0, 0, 0.04)" : "#6C309C",
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

      <AddFeaturesModal
        open={isAddModalOpen}
        handleClose={handleIsAddModalClose}
        setOpen={setIsAddModalOpen}
        fetchFeatures={fetchFeatures}
      />
    </>
  );
};

export default Features;
