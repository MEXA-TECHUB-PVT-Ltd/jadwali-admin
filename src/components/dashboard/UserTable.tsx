import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button, Paper, Avatar, Box, Pagination } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import UserDetailModel from '../Models/UserDetailModel';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import ToastModal from '../Models/TostModal';
import * as React from 'react';



const UserTable = ({ users, status }: any) => {
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [currentUsers, setCurrentUsers] = useState(users);
    const [toastOpen, setToastOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

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

    return (
        <div >
            <ToastModal open={toastOpen} onClose={handleCloseToast} eventMessage={toastMessage} />
            <TableContainer  component={Paper}
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
                            <TableCell padding="checkbox" sx={{ minWidth: 170 }} >
                                <Checkbox
                                    color="primary"
                                    indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                                    checked={users.length > 0 && selectedUsers.length === users.length}
                                    onChange={handleSelectAllClick}
                                    style={{ color: '#C4C4C4' }}
                                />
                            </TableCell>
                            <TableCell style={{ color: '#6C309C', minWidth: 170 }} sx={{ fontWeight: 'bold' }}>USER</TableCell>
                            <TableCell style={{ color: '#6C309C', minWidth: 170 }} sx={{ fontWeight: 'bold' }}>EMAIL ADDRESS</TableCell>
                            <TableCell style={{ color: '#6C309C', minWidth: 170 }} sx={{ fontWeight: 'bold' }}>TOTAL EVENTS</TableCell>
                            {status && <TableCell style={{ color: '#6C309C' }} sx={{ fontWeight: 'bold' }}>Status</TableCell>}
                            <TableCell style={{ color: '#6C309C', minWidth: 170 }} sx={{ fontWeight: 'bold' }}>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((user: any) => (
                            <TableRow hover key={user.id} role="checkbox" tabIndex={-1} selected={isSelected(user.id)}>
                                <TableCell padding="checkbox" sx={{}}>
                                    <Checkbox
                                        color="primary"
                                        checked={isSelected(user.id)}
                                        style={{ color: '#C4C4C4' }}
                                        onChange={(event) => handleClick(event, user.id)}
                                    />
                                </TableCell>

                                <TableCell sx={{}}>
                                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <Avatar src=''
                                        style={{ marginRight: '8px' }}
                                        />
                                        {user.name}
                                    </div>
                                </TableCell>
                                <TableCell sx={{}}>{user.email}</TableCell>
                                <TableCell sx={{}}>{user.events}</TableCell>
                                {
                                    status &&
                                    <TableCell sx={{}}>
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



                                <TableCell >
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
                                                    marginRight: '10px',
                                                    width: '100px'
                                                }}
                                                size='small'
                                                onClick={() => toggleUserStatus(user.id)}
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
                handleClose={handleCloseModal}
                status={selectedStatus}
            />

        </div>
    )
}

export default UserTable

























