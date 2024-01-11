import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import { Box, Button, Typography, Paper } from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import React from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Outlet } from "react-router-dom";
import { navItems } from "../../utils/dashboardLinks";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SubscriptionModel from "../Models/SubscriptionModel";
import ChangePasswordModel from "../Models/ChangePassword";
import DeleteModal from "../Models/DeleteModel";
import { useNavigate } from "react-router-dom";
import { users } from "../../utils/dashboard";
import {
  Drawer,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { useState, useEffect, useRef } from "react";
import UserDetailModel from "../Models/UserDetailModel";
import MenuIcon from "@mui/icons-material/Menu";
import ToastModal from "../Models/TostModal";
import CssBaseline from "@mui/material/CssBaseline";
import logo from "../../../public/images/logo.png";
import { get } from "../../server/server";

const Layout = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth > 1200);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const navigate = useNavigate();

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/auth/sign-in";
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        setInnerWidth(true);
      } else {
        setInnerWidth(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [innerWidth]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: innerWidth ? "row" : "column",
        }}
      >
        {innerWidth && (
          <SideNav
            handleDeleteModal={handleDeleteModal}
            handleDeleteCloseModal={handleDeleteCloseModal}
            onLogout={onLogout}
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        )}
        <div
        style={{
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        >
          <TopHeader
            handleDeleteModal={handleDeleteModal}
            handleDeleteCloseModal={handleDeleteCloseModal}
            onLogout={onLogout}
            isDeleteModalOpen={isDeleteModalOpen}
            setIsMobileNavOpen={setIsMobileNavOpen}
            isDrawerOpen={isDrawerOpen}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            innerWidth={innerWidth}
          />
          <div
            style={{ padding: "20px", marginLeft: innerWidth ? "250px" : "0" }}
          >
          <CssBaseline />
          <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

const SideNav = ({
  handleDeleteModal,
  handleDeleteCloseModal,
  isDeleteModalOpen,
  onLogout,
  setIsDrawerOpen,
}) => {
  const [hoverIndex, setHoverIndex] = React.useState(null);

  const handleHover = (index) => {
    setHoverIndex(index);
  };

  const handleHoverExit = () => {
    setHoverIndex(null);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "rgba(108, 48, 156, 1)",
        height: "100%",
        position: "fixed",
        overflow: "auto",
      }}
    >
      <div>
        <List>
          <Link to="/" className="flex justify-center items-center mt-3 mb-5">
            <img src={logo} alt="Logo" width={120} height={150} />
          </Link>
          {navItems.map(({ text, icon, path }, index) => {
            const location = useLocation();

            const isActive = location.pathname === path;

            return (
              <ListItem
                key={text}
                className="listItem"
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={handleHoverExit}
              >
                <NavLink
                  to={path}
                  className={isActive ? "link activeLink" : "link"}
                  // onClick={() => setIsDrawerOpen(false)}
                >
                  <ListItemIcon
                    // onClick={() => setIsDrawerOpen(false)}
                    className="listItemIcon"
                    style={{
                      color:
                        index === hoverIndex || isActive
                          ? "rgba(108, 48, 156, 1)"
                          : "white",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </NavLink>
              </ListItem>
            );
          })}
        </List>
      </div>
      <div style={{ padding: "16px" }}>
        <Button
          startIcon={<ExitToAppIcon />}
          fullWidth
          variant="contained"
          style={{
            backgroundColor: "white",
            color: "rgba(108, 48, 156, 1)",
            transition: "background-color 0.3s ease",
          }}
          onClick={handleDeleteModal}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

const TopHeader = ({
  handleDeleteModal,
  handleDeleteCloseModal,
  isDeleteModalOpen,
  onLogout,
  isDrawerOpen,
  handleDrawerOpen,
  handleDrawerClose,
  innerWidth,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleSearchQuery = async () => {
      if (searchTerm.trim()) {
        try {
          const { res } = await get(`/universal/search?query=${searchTerm}`);
          setSearchResults(res.result || []);
        } catch (err) {
          console.error(err);
        }
      } else {
        setSearchResults([]);
      }
    };
    if (searchTerm.trim()) {
      setShowDropdown(true);
      handleSearchQuery();
    } else {
      setShowDropdown(false);
    }
    handleSearchQuery();
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setSearchTerm(""); // Clear the search term
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResultClick = (result) => {
    switch (result.type) {
      case "user":
        navigate("/dashboard/all-users");
        break;
      case "feature":
        navigate("/dashboard/features");
        break;
      // Add more cases as needed
      default:
        console.error("Unknown type:", result.type);
    }
  };

  const handleOpenModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = (event) => {
    event.stopPropagation();
    console.log("CLICKED");
    setIsModalOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          backgroundColor: "#C7AEDB",
          height: "70px",
        }}
      >
        {!innerWidth && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ marginRight: "50px" }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "0 5px",
          }}
        >
          <Box sx={{ position: "relative" }}>
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "0 5px",
                // width: 300,
              }}
            >
              <SearchIcon sx={{ color: "#959595" }} />
              <InputBase
                placeholder="Search…"
                sx={{ pl: 1, width: "100%" }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Box> */}
            {showDropdown && searchResults.length > 0 && (
              <Box
                ref={dropdownRef}
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  maxHeight: 200,
                  overflowY: "auto",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  mt: 1,
                  py: 1,
                  zIndex: 999999999,
                }}
              >
                {searchResults.map((result, index) => (
                  <Box
                    key={index}
                    sx={{
                      px: 2,
                      py: 1,
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                    onClick={() => handleResultClick(result)}
                  >
                    {result.name}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar
            alt="Remy Sharp"
            sx={{
              backgroundColor: "rgba(108, 48, 156, 1)",
            }}
          />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ mt: 6, width: "900px" }}
        >
          <div
            className="flex items-center pe-2 bg-[#6C309C] cursor-pointer"
            onClick={handleDeleteModal}
          >
            <MenuItem className="flex-grow" sx={{ color: "white" }}>
              {user.email}
            </MenuItem>
            <LogoutIcon sx={{ color: "white" }} />
          </div>
          <div
            className="flex items-center pe-2 cursor-pointer"
            onClick={handleOpenModal}
          >
            <MenuItem className="flex-grow">Change Password</MenuItem>
            <ChevronRightIcon />
          </div>
        </Menu>
      </Box>

      <Drawer
        anchor="top"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{ width: "900px" }}
      >
        <SideNav />
      </Drawer>
      <ChangePasswordModel
        open={isModalOpen}
        handleClose={handleCloseModal}
        setOpen={setIsModalOpen}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={handleDeleteCloseModal}
        onDelete={onLogout}
        title="Logout"
        paragraph="Do you want to logout?"
        actionText="Logout"
        eventMessage="Logout Successfully"
      />
    </>
  );
};
