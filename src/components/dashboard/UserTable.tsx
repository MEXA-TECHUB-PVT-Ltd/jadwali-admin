import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button, Paper, Avatar, Box, Pagination } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import UserDetailModel from '../Models/UserDetailModel';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import ToastModal from '../Models/TostModal';
import * as React from 'react';
import DeleteModal from '../Models/DeleteModel';



const UserTable = ({ users, status }: any) => {
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [currentUsers, setCurrentUsers] = useState(users);
    const [toastOpen, setToastOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);


    const handleOpenDeleteModal = (userId: number) => {
        setCurrentUserId(userId);
        setIsDeleteModalOpen(true);
    }

    const handleBlockUser = () => {
        if (currentUserId) {
            toggleUserStatus(currentUserId);
            setIsDeleteModalOpen(false);
        }
    }


    const theme = useTheme();

    const rowsPerPage = 10;

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




    const handleOpenModal = (status: string, userId: number) => {
        setSelectedStatus(status);
        setCurrentUserId(userId);
        setIsModalOpen(true);
    };

    const handleToggleStatusFromModal = () => {
        if (currentUserId) {
            toggleUserStatus(currentUserId);
            setIsDeleteModalOpen(false);
        }
    }


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

        const clickedUser = paginatedUsers.find((user: any) => user.id === id);
        if (clickedUser) {
            setSelectedStatus(clickedUser.status);
        }

        setSelectedUsers(newSelected);
    };

    const isSelected = (id: any) => selectedUsers.indexOf(id) !== -1;

    const maxPages = Math.ceil(users.length / rowsPerPage);

    const handleNextPage = () => {
        if (page < maxPages) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    // const paginatedUsers = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const paginatedUsers = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const numAdjacentButtons = 1;
    const handleCloseToast = () => {
        setToastOpen(false);
    };

    const handleDeleteCloseModal = () => {
        setIsDeleteModalOpen(false);
    }

    return (
        <div >
            <ToastModal open={toastOpen} onClose={handleCloseToast} eventMessage={toastMessage} />
            <TableContainer component={Paper}
                sx={{
                    borderRadius: '10px',
                    width: '100%',
                    maxWidth: '100%',
                    overflowX: 'scroll'
                }}
            >
                <Table sx={{ minWidth: '250px' }}>
                    <TableHead style={{ backgroundColor: '#F4E9FD' }}>
                        <TableRow>
                            <TableCell align='left' sx={{ minWidth: 120, color: '#6C309C' }} >
                                NO
                            </TableCell>
                            <TableCell align='left' style={{ color: '#6C309C', minWidth: 120 }} sx={{ fontWeight: 'bold' }}>USER</TableCell>
                            <TableCell align='left' style={{ color: '#6C309C', minWidth: 120 }} sx={{ fontWeight: 'bold' }}>EMAIL ADDRESS</TableCell>
                            <TableCell align='left' style={{ color: '#6C309C', minWidth: 120 }} sx={{ fontWeight: 'bold' }}>TOTAL EVENTS</TableCell>
                            {status && <TableCell align='left' style={{ color: '#6C309C' }} sx={{ fontWeight: 'bold' }}>Status</TableCell>}
                            <TableCell align='left' style={{ color: '#6C309C', minWidth: 120 }} sx={{ fontWeight: 'bold' }}>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((user: any, index:any) => (
                            <TableRow hover key={user.id} role="checkbox" tabIndex={-1} selected={isSelected(user.id)}>
                                <TableCell align='left' sx={{}}>
                                    {index+1}
                                </TableCell>

                                <TableCell align='left' sx={{}}>
                                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <Avatar src=''
                                            style={{ marginRight: '8px' }}
                                        />
                                        {user.name}
                                    </div>
                                </TableCell>
                                <TableCell align='left' sx={{}}>{user.email}</TableCell>
                                <TableCell align='left' sx={{}}>{user.events}</TableCell>
                                {
                                    status &&
                                    <TableCell align='left' sx={{}}>
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
                                                        // display: 'inline-block',
                                                        fontWeight: 'bold',
                                                        width: '100px',
                                                        textAlign: 'center'

                                                    }}
                                                >
                                                    {user.payment}
                                                </div> : null
                                        }
                                    </TableCell>
                                }



                                <TableCell align='left' >
                                    <Visibility
                                        sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '20px' }}
                                        className='cursor-pointer me-5'
                                        onClick={() => {
                                            if (location.pathname === "/dashboard/all-users") {
                                                handleOpenModal(user.status, user.id);
                                            } else {
                                                handleOpenModal(user.payment, user.id);
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
                                                    marginRight: '10px',
                                                    width: '100px'
                                                }}
                                                size='small'
                                                onClick={() => handleOpenDeleteModal(user.id)}
                                            >
                                                {user.status}
                                            </Button>
                                            :
                                            ''
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
            <UserDetailModel
                open={isModalOpen}
                setOpen={setIsModalOpen}
                handleClose={handleCloseModal}
                status={selectedStatus}
                onToggleStatus={handleToggleStatusFromModal}
                handleDeleteCloseModal={handleDeleteCloseModal}
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
            <DeleteModal
                open={isDeleteModalOpen}
                handleClose={handleDeleteCloseModal}
                onDelete={handleBlockUser}
                title="Block User"
                paragraph="Do you really want to block this User?"
                actionText="Block"
                eventMessage="User Block Successfully!"
            />

        </div>
    )
}

export default UserTable
