import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button, Paper, Avatar, Box, Pagination } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import { useState } from 'react';

const UserTable = ({ users, status }: any) => {
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
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
    const paginatedUsers = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const numAdjacentButtons = 1;

    return (
        <>
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
                            <TableCell style={{ color: '#6C309C' }}>EMAIL ADDRESS</TableCell>
                            <TableCell style={{ color: '#6C309C' }}>TOTAL EVENTS</TableCell>
                            {status && <TableCell style={{ color: '#6C309C' }}></TableCell>}
                            <TableCell style={{ color: '#6C309C' }}>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((user: any) => (
                            <TableRow key={user.id} onClick={(event) => handleClick(event, user.id)} role="checkbox" tabIndex={-1} selected={isSelected(user.id)}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        checked={isSelected(user.id)}
                                        style={{ color: '#C4C4C4' }}

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
                                            user.status ?
                                                <Button
                                                    variant="contained"
                                                        sx={{
                                                            backgroundColor: user.status === 'Unpaid' ? '#FF5858' : '#00C342',
                                                            '&:hover': {
                                                                backgroundColor: user.status === 'Unpaid' ? '#FF5858' : '#00C342',
                                                            },
                                                            marginRight: '10px'
                                                        }}
                                                    size='small'
                                                >
                                                    {user.status}
                                                </Button> : null
                                        }
                                    </TableCell>
                                }



                                    <TableCell>
                                        <Visibility sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '20px' }} className='cursor-pointer me-5' />
                                        {
                                            (!status) &&
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: user.status === 'Block' ? '#FF5858' : '#00C342',
                                                    '&:hover': {
                                                        backgroundColor: user.status === 'Unblock' ? '#FF5858' : '#00C342',
                                                    },
                                                    marginRight: '10px'
                                                }}
                                                size='small'
                                            >
                                                Block
                                            </Button>
                                        }


                                    {/* <Button variant="contained"
                                        sx={{
                                            backgroundColor: '#00C342',
                                            '&:hover': {
                                                backgroundColor: '#00C342',
                                            }
                                        }}
                                        size='small'
                                    >
                                        UnBlock
                                    </Button> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default UserTable
