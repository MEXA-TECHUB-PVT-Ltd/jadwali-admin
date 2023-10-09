import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button, Paper, Avatar, Box, Pagination } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import UserDetailModel from '../Models/UserDetailModel';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import ToastModal from '../Models/TostModal';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditFeaturesModal from '../Models/EditFeaturesModal';
import DeleteModal from '../Models/DeleteModel';


const FeaturesTable = ({ features, updateSelectedFeatures }: any) => {
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [currentUsers, setCurrentUsers] = useState(features);
    const [toastOpen, setToastOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [editData, setEditData] = React.useState();
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);





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



    const handleIsEditModalOpen = (data: any) => {
        setEditData(data);
        setIsEditModalOpen(true);
        (true);
    }

    const handleIsEditModalClose = () => {
        setIsEditModalOpen(false);
    }
    
    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    }
    const handleDeleteCloseModal = () => {
        setIsDeleteModalOpen(false);
    }




    const handleOpenModal = (status: string) => {
        setSelectedStatus(status);
        setIsModalOpen(true);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    React.useEffect(() => {
        const selectedFeaturesData = features.filter((feature:any) => selectedUsers.includes(feature.id));
        updateSelectedFeatures(selectedFeaturesData);
    }, [selectedUsers, features, updateSelectedFeatures]);




    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds = features.map((n: any) => n.id);
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

        const clickedUser = paginationData.find((user: any) => user.id === id);
        if (clickedUser) {
            setSelectedStatus(clickedUser.status);
        }

        setSelectedUsers(newSelected);
    };

    const isSelected = (id: any) => selectedUsers.indexOf(id) !== -1;

    const maxPages = Math.ceil(features.length / rowsPerPage);

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
    const paginationData = features.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const numAdjacentButtons = 1;
    const handleCloseToast = () => {
        setToastOpen(false);
    };

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
                            <TableCell padding="checkbox" sx={{ minWidth: 170 }} >
                                <Checkbox
                                    color="primary"
                                    onChange={handleSelectAllClick}
                                    style={{ color: '#C4C4C4' }}
                                />
                            </TableCell>
                            <TableCell style={{ color: '#6C309C', minWidth: 170 }} sx={{ fontWeight: 'bold' }}>Features Description</TableCell>
                            <TableCell style={{ color: '#6C309C', minWidth: 170 }} sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginationData.map((feature: any) => (
                            <TableRow hover key={feature.id} role="checkbox" tabIndex={-1} selected={isSelected(feature.id)}>
                                <TableCell padding="checkbox" sx={{}}>
                                    <Checkbox
                                        color="primary"
                                        checked={isSelected(feature.id)}
                                        style={{ color: '#C4C4C4' }}
                                        onChange={(event) => handleClick(event, feature.id)}
                                    />
                                </TableCell>

                                <TableCell sx={{}}>
                                    <div style={{ display: 'flex',  flexWrap: 'wrap' }}>
                                        <Avatar src=''
                                            style={{ marginRight: '8px' }}
                                        />
                                        {feature.featuresDescription}
                                    </div>
                                </TableCell>

                                <TableCell sx={{}}>
                                    <BorderColorIcon
                                        sx={{ color: '#6C309C', marginRight: '20px', cursor: 'pointer' }}
                                        onClick={() => handleIsEditModalOpen(feature.featuresDescription)}
                                    />
                                    <DeleteIcon
                                        sx={{ color: 'red', cursor: 'pointer' }}
                                        onClick={() => handleOpenDeleteModal()}
                                    />
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
            <EditFeaturesModal
                open={isEditModalOpen}
                handleClose={handleIsEditModalClose}
                setOpen={handleIsEditModalClose}
                description={editData}
            />
            <DeleteModal
                open={isDeleteModalOpen}
                handleClose={handleDeleteCloseModal}
                onDelete={handleDeleteCloseModal}
                title="Delete Feature"
                paragraph="Do you want to delete this feature?"
                actionText="Delete"
            />
        </div>
    )
}

export default FeaturesTable

























