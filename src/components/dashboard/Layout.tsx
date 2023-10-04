import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import { Box, Button, Typography, Paper } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import UserDetailModel from '../Models/UserDetailModel';

import ToastModal from '../Models/TostModal';




const Layout = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    const navigate = useNavigate();


    const handleDeleteModal = () => {
        setIsDeleteModalOpen(true);
    }
    const handleDeleteCloseModal = () => {
        setIsDeleteModalOpen(false)
    }

    const onLogout = () => {
        navigate('/auth/sign-in');
    }
    return (
        <>
            <div style={{ display: 'flex' }}>
                <SideNav
                    handleDeleteModal={handleDeleteModal}
                    handleDeleteCloseModal={handleDeleteCloseModal}
                    onLogout={onLogout}
                    isDeleteModalOpen={isDeleteModalOpen}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <TopHeader
                        handleDeleteModal={handleDeleteModal}
                        handleDeleteCloseModal={handleDeleteCloseModal}
                        onLogout={onLogout}
                        isDeleteModalOpen={isDeleteModalOpen}
                    />
                    <div style={{ padding: '20px', marginLeft: '250px' }}>
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Layout


const SideNav = ({ handleDeleteModal, handleDeleteCloseModal, isDeleteModalOpen, onLogout }: any) => {
    const [hoverIndex, setHoverIndex] = React.useState<any>(null);

    const handleHover = (index: any) => {
        setHoverIndex(index);
    };

    const handleHoverExit = () => {
        setHoverIndex(null);
    };
    return (

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            // width: '250px',
            backgroundColor: 'rgba(108, 48, 156, 1)',
            height: '100vh',
            position: 'fixed',
        }}>
            <div>
                <List>
                    <Typography
                        className='text-center'
                        sx={{
                            fontSize: '30px',
                            color: '#fff',
                            fontWeight: 'medium',
                            mt: 3,
                            mb: 6
                        }}
                    >
                        JADWALI
                    </Typography>
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

const TopHeader = ({ handleDeleteModal, handleDeleteCloseModal, isDeleteModalOpen, onLogout }: any) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [searchTerm, setSearchTerm] = React.useState<string>("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(
        user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )


    const handleOpenModal = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setIsModalOpen(true);
    };



    const handleCloseModal = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        console.log("CLICKED")
        setIsModalOpen(false);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


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
                <Box sx={{
                    display: 'flex', alignItems: 'center', marginLeft: 'auto',
                    backgroundColor: "white", borderRadius: '20px', padding: '0 5px'
                }}>
                    <SearchIcon sx={{
                        fontSize: '20px',
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
                    sx={{ mt: 4, width: '900px' }}
                >
                    <div className="flex items-center pe-2 bg-[#6C309C]">
                        <MenuItem onClick={handleDeleteModal} className='flex-grow' sx={{ color: 'white' }}>
                            example@gamil.com
                        </MenuItem>
                        <LogoutIcon sx={{ color: 'white' }} />
                    </div>
                    <div className="flex items-center pe-2">
                        <MenuItem onClick={handleOpenModal} className='flex-grow'>
                            Change Password
                        </MenuItem>
                        <ChevronRightIcon />
                    </div>
                </Menu>
            </Box>


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
            />
        </>
    )
};


const UserTable = ({ users, status }: any) => {
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [currentUsers, setCurrentUsers] = useState(users);
    const [toastOpen, setToastOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const location = useLocation();

    const toggleUserStatus = (userId: number) => {
        const updatedUsers = currentUsers.map((user: any) => {
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




    const handleOpenModal = (status: string) => {
        setSelectedStatus(status);
        setIsModalOpen(true);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };



    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds = users.map((n: any) => n.id);
            setSelectedUsers(newSelecteds);
            return;
        }
        setSelectedUsers([]);
    };

    const handleClick = (event: any, id: any) => {
        const selectedIndex = selectedUsers.indexOf(id);
        let newSelected: any[] = [];

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

        const clickedUser = users.find((user: any) => user.id === id);
        if (clickedUser) {
            setSelectedStatus(clickedUser.status);
        }

        setSelectedUsers(newSelected);
    };

    const isSelected = (id: any) => selectedUsers.indexOf(id) !== -1;


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
                            users.map((user: any) => (
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
