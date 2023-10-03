import React from 'react'
import UserTable from '../../components/dashboard/UserTable'
import { users } from '../../utils/dashboard'
import { Box, Button, Typography, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TCommonTable } from '../../types/types';



const CommonTable = ({ title, status }: TCommonTable) => {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;


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
    const numAdjacentButtons = 1;
    return (
        <>
            <div className="flex justify-between items mt-10 mb-5">
                <Typography fontSize='25px'>{title}</Typography>
                <Box sx={{
                    display: 'flex', alignItems: 'center', marginLeft: 'auto',
                    backgroundColor: "white", borderRadius: '20px', padding: '0 5px', borderWidth: '1px', borderColor: 'gray'
                }}>
                    <SearchIcon sx={{
                        fontSize: '20px',
                        color: '#959595',
                    }} />
                    <InputBase placeholder="Search…" sx={{ pl: 1 }} />
                </Box>
            </div>

            <UserTable
                users={users}
                status={status}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="1rem">
                <span>
                    Showing
                    {((page - 1) * rowsPerPage) + 1}
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
                            backgroundColor: page <= 1 ? 'grey' : '#6C309C',
                            borderRadius: '20px',
                            '&:hover': {
                                backgroundColor: page <= 1 ? 'grey' : '#6C309C',
                            },
                            borderColor: 'inherit',
                            color: 'white'
                        }}
                    >
                        Previous
                    </Button>

                    {[...Array(maxPages)].map((_, index) => {
                        if (index + 1 >= page - numAdjacentButtons && index + 1 <= page + numAdjacentButtons) {
                            return (

                                <Button
                                    key={index}
                                    variant="contained"
                                    color={page === index + 1 ? 'primary' : 'secondary'}
                                    onClick={() => setPage(index + 1)}
                                    sx={{
                                        backgroundColor: page === index + 1 ? '#FFFFFF' : '#6C309C',
                                        borderRadius: '20PX',
                                        height: '32px',
                                        width: '32px',
                                        margin: '0 5px',
                                        color: page === index + 1 ? '#6C309C' : '#FFFFFF',
                                        '&:hover': {
                                            backgroundColor: page === index + 1 ? 'rgba(0, 0, 0, 0.04)' : '#6C309C',
                                        },
                                        padding: 0,
                                    }}
                                    size='small'
                                >
                                    {index + 1}
                                </Button>
                            )
                        }
                        return null;
                    }
                    )}

                    <Button
                        variant="outlined"
                        disabled={page >= maxPages}
                        onClick={handleNextPage}
                        sx={{
                            backgroundColor: page >= maxPages ? 'grey' : '#6C309C',
                            borderRadius: '20px',
                            '&:hover': {
                                backgroundColor: page >= maxPages ? 'grey' : '#6C309C',
                            },
                            borderColor: 'inherit',
                            color: '#FFFFFF'
                        }}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default CommonTable
