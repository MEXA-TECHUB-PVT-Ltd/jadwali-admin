import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import { Box, Button, Typography, Paper } from '@mui/material';
import { Link, NavLink, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Outlet } from 'react-router-dom';
import { navItems } from '../../utils/dashboardLinks';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SubscriptionModel from '../Models/SubscriptionModel';
import ChangePasswordModel from '../Models/ChangePassword';
import DeleteModal from '../Models/DeleteModel';
import { useNavigate } from 'react-router-dom';
import { users } from '../../utils/dashboard';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Drawer } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import UserDetailModel from '../Models/UserDetailModel';
import MenuIcon from '@mui/icons-material/Menu';
import ToastModal from '../Models/TostModal';
import CssBaseline from '@mui/material/CssBaseline';
import logo from '../../../public/images/logo.png'

const Layout = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
    const [innerWidth, setInnerWidth] = React.useState(window.innerWidth > 1100);

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    }

    const navigate = useNavigate();


    const handleDeleteModal = () => {
        setIsDeleteModalOpen(true);
    }
    const handleDeleteCloseModal = () => {
        setIsDeleteModalOpen(false)
    }

    const onLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location = "/auth/sign-in";
    }

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1100) {
                setInnerWidth(true);
            }
            else {
                setInnerWidth(false);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <>
            <div style={{ display: 'flex' }}>
                {innerWidth && (
                    <SideNav
                        handleDeleteModal={handleDeleteModal}
                        handleDeleteCloseModal={handleDeleteCloseModal}
                        onLogout={onLogout}
                        isDeleteModalOpen={isDeleteModalOpen}
                        setIsDrawerOpen={setIsDrawerOpen}
                    />
                )}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                    <div style={{ padding: '20px', marginLeft: innerWidth ? '250px' : '0' }}>
                        <CssBaseline />
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Layout


const SideNav = ({ handleDeleteModal, handleDeleteCloseModal, isDeleteModalOpen, onLogout, setIsDrawerOpen }) => {
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
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(108, 48, 156, 1)',
                height: '100%',
                position: 'fixed',
            }}>
            <div>
                <List>
                    <Link to='/' className='flex justify-center items-center mt-3 mb-5'>
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
                                    className={isActive ? 'link activeLink' : 'link'}
                                >
                                    <ListItemIcon
                                        onClick={() => setIsDrawerOpen(false)}
                                        className="listItemIcon"
                                        style={{
                                            color: index === hoverIndex || isActive ? 'rgba(108, 48, 156, 1)' : 'white',
                                            transition: 'color 0.3s ease'
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
            <div style={{ padding: '16px' }}>
                <Button
                    startIcon={<ExitToAppIcon />}
                    fullWidth
                    variant="contained"
                    style={{
                        backgroundColor: 'white',
                        color: 'rgba(108, 48, 156, 1)',
                        transition: 'background-color 0.3s ease'
                    }}
                    onClick={handleDeleteModal}
                >
                    Log Out
                </Button>
            </div>
        </div>
    );
};

const TopHeader = ({ handleDeleteModal, handleDeleteCloseModal, isDeleteModalOpen, onLogout, isDrawerOpen, handleDrawerOpen,
    handleDrawerClose, innerWidth
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [searchTerm, setSearchTerm] = React.useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(
        user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )


    const handleOpenModal = (event) => {
        event.stopPropagation();
        setIsModalOpen(true);
    };



    const handleCloseModal = (event) => {
        event.stopPropagation();
        console.log("CLICKED")
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
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 20px',
                    backgroundColor: '#C7AEDB',
                    height: '70px'
                }}
            >
                {
                    !innerWidth &&
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                        sx={{ marginRight: '50px' }}
                    >
                        <MenuIcon />
                    </IconButton>
                }
                <Box sx={{
                    display: 'flex', alignItems: 'center', marginLeft: 'auto',
                    backgroundColor: "white", borderRadius: '20px', padding: '0 5px'
                }}>
                    <SearchIcon sx={{
                        // fontSize: '20px',
                        color: '#959595',
                    }} />
                    <InputBase
                        placeholder="Search…"
                        sx={{ pl: 1 }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Box>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"

                >
                    <Avatar alt="Remy Sharp" sx={{
                        backgroundColor: 'rgba(108, 48, 156, 1)'
                    }}
                    />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{ mt: 6, width: '900px' }}
                >
                    <div className="flex items-center pe-2 bg-[#6C309C] cursor-pointer" onClick={handleDeleteModal} >
                        <MenuItem className='flex-grow' sx={{ color: 'white' }}>
                            {user.email}
                        </MenuItem>
                        <LogoutIcon sx={{ color: 'white' }} />
                    </div>
                    <div className="flex items-center pe-2 cursor-pointer" onClick={handleOpenModal}>
                        <MenuItem className='flex-grow'>
                            Change Password
                        </MenuItem>
                        <ChevronRightIcon />
                    </div>
                </Menu>
            </Box>

            <Drawer
                anchor="top"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
                sx={{ width: '900px' }}
            >
                <SideNav />
            </Drawer>


            {
                searchTerm && (
                    <div style={{ margin: '10px 10px 10px 270px' }}>
                        {
                            filteredUsers.length ?
                                (
                                    <UserTable users={filteredUsers} />
                                )
                                :
                                (
                                    <Typography variant="h6" className='text-center mt-5 text-red-600'>
                                        User Not Found
                                    </Typography>
                                )
                        }
                    </div>
                )
            }


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
    )
};


const UserTable = ({ users, status }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [currentUsers, setCurrentUsers] = useState(users);
    const [toastOpen, setToastOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const location = useLocation();

    const toggleUserStatus = (userId) => {
        const updatedUsers = currentUsers.map((user) => {
            if (user.id === userId) {
                const newStatus = user.status === "Block" ? "Unblock" : "Block";
                setToastMessage(`User ${newStatus === "Block" ? "blocked" : "unblocked"} successfully!`);
                return {
                    ...user,
                    status: newStatus,
                };
            }
            return user;
        });

        setCurrentUsers(updatedUsers);

        if (toastOpen) {
            setToastOpen(false);
        }

        setTimeout(() => {
            setToastOpen(true);
        }, 100);
    };




    const handleOpenModal = (status) => {
        setSelectedStatus(status);
        setIsModalOpen(true);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };



    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((n) => n.id);
            setSelectedUsers(newSelecteds);
            return;
        }
        setSelectedUsers([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selectedUsers.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedUsers, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedUsers.slice(1));
        } else if (selectedIndex === selectedUsers.length - 1) {
            newSelected = newSelected.concat(selectedUsers.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedUsers.slice(0, selectedIndex),
                selectedUsers.slice(selectedIndex + 1)
            );
        }

        const clickedUser = users.find((user) => user.id === id);
        if (clickedUser) {
            setSelectedStatus(clickedUser.status);
        }

        setSelectedUsers(newSelected);
    };

    const isSelected = (id) => selectedUsers.indexOf(id) !== -1;


    const numAdjacentButtons = 1;
    const handleCloseToast = () => {
        setToastOpen(false);
    };

    return (
        <>
            <ToastModal open={toastOpen} onClose={handleCloseToast} eventMessage={toastMessage} />
            <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
                <Table>
                    <TableHead style={{ backgroundColor: '#F4E9FD' }}>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                                    checked={users.length > 0 && selectedUsers.length === users.length}
                                    onChange={handleSelectAllClick}
                                    style={{ color: '#C4C4C4' }}
                                />
                            </TableCell>
                            <TableCell style={{ color: '#6C309C' }} sx={{ fontWeight: 'bold' }}>USER</TableCell>
                            <TableCell style={{ color: '#6C309C' }} sx={{ fontWeight: 'bold' }}>EMAIL ADDRESS</TableCell>
                            <TableCell style={{ color: '#6C309C' }} sx={{ fontWeight: 'bold' }}>TOTAL EVENTS</TableCell>
                            {status && <TableCell style={{ color: '#6C309C' }} sx={{ fontWeight: 'bold' }}>Status</TableCell>}
                            <TableCell style={{ color: '#6C309C' }} sx={{ fontWeight: 'bold' }}>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map((user) => (
                                <TableRow key={user.id} role="checkbox" tabIndex={-1} selected={isSelected(user.id)}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isSelected(user.id)}
                                            style={{ color: '#C4C4C4' }}
                                            onChange={(event) => handleClick(event, user.id)}
                                        />
                                    </TableCell>

                                    <TableCell>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar src='' style={{ marginRight: '8px' }} />
                                            {user.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.events}</TableCell>
                                    {
                                        status &&
                                        <TableCell>
                                            {
                                                user.payment === 'Unpaid' || user.payment === 'Paid' ?
                                                    <div
                                                        style={{
                                                            backgroundColor: user.payment === 'Unpaid' ? '#FF5858' : '#00C342',
                                                            borderRadius: '10px',
                                                            borderColor: 'inherit',
                                                            color: 'white',
                                                            marginTop: '10px',
                                                            padding: '6px 16px',
                                                            display: 'inline-block',
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        {user.payment}
                                                    </div> : null
                                            }
                                        </TableCell>
                                    }



                                    <TableCell>
                                        <Visibility
                                            sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '20px' }}
                                            className='cursor-pointer me-5'
                                            onClick={() => {
                                                if (location.pathname === "/dashboard/all-users") {
                                                    handleOpenModal(user.status);
                                                } else {
                                                    handleOpenModal(user.payment);
                                                }
                                            }}
                                        />
                                        {
                                            (location.pathname === '/dashboard/all-users' || location.pathname === '/dashboard' || location.pathname === '/') ?
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: user.status === 'Block' ? '#FF5858' : '#00C342',
                                                        '&:hover': {
                                                            backgroundColor: user.status === 'Unblock' ? '#00C342' : '#FF5858',
                                                        },
                                                        marginRight: '10px'
                                                    }}
                                                    size='small'
                                                    onClick={() => toggleUserStatus(user.id)}
                                                >
                                                    {user.status}
                                                </Button>
                                                :
                                                ''
                                            // <Button
                                            //     variant="contained"
                                            //     sx={{
                                            //         backgroundColor: user.payment === 'Paid' ? '#FF5858' : '#00C342',
                                            //         '&:hover': {
                                            //             backgroundColor: user.payment === 'Unpaid' ? '#FF5858' : '#00C342',
                                            //         },
                                            //         marginRight: '10px'
                                            //     }}
                                            //     size='small'
                                            // >
                                            //     {user.payment}
                                            // </Button>

                                        }
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

        </>
    )
}
