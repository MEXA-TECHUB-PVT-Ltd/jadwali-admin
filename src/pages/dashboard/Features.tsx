import React from 'react'
import { users } from '../../utils/dashboard'
import { Box, Button, Typography, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import FeaturesTable from '../../components/dashboard/FeaturesTable';
import { features } from '../../utils/featuresData';

import AddIcon from '@mui/icons-material/Add';
import AddFeaturesModal from '../../components/Models/AddFeaturesModal';
import EditFeaturesModal from '../../components/Models/EditFeaturesModal';
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Features = () => {
    const [page, setPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [selectedFeatures, setSelectedFeatures] = React.useState<any[]>([]);



    const handleIsAddModalOpen = React.useCallback(() => {
        setIsAddModalOpen(true);
    }, []);

    const handleIsAddModalClose = React.useCallback(() => {
        setIsAddModalOpen(false);
    }, [])


    const location = useLocation();


    const { state } = location;
    const {
        plan = "",
        previousPage = "",
        previousFeatures = [],
        openAddModal = '',
        modalName = ''
    } = state ?? {};

    React.useEffect(() => {
        if (previousFeatures && previousFeatures.length > 0 && modalName === 'Edit') {
            localStorage.setItem("shouldOpenSubEdit", "true");
            const mergedFeatures = [...new Set([...selectedFeatures, ...previousFeatures])];
            localStorage.setItem("EditFeatures", JSON.stringify([...new Set([...selectedFeatures, ...previousFeatures])]));
            setSelectedFeatures(mergedFeatures);
        } else {
            localStorage.setItem("shouldOpenModal", "true");
            setSelectedFeatures([...selectedFeatures]);
            localStorage.setItem("AddFeatures", JSON.stringify([...selectedFeatures]));
        }
    }, [previousFeatures]);



    // React.useEffect(() => {
    //     if (previousFeatures && previousFeatures.length > 0) {
    //         const featuresToStore = [...new Set([...selectedFeatures, ...previousFeatures])];
    //         localStorage.setItem("EditFeatures", JSON.stringify(featuresToStore));
    //     }
    // }, [selectedFeatures, previousFeatures]);







    React.useEffect(() => {
        setPage(1);
    }, [searchTerm]);

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


    const filteredUsers = users.filter(
        user => {
            return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        }
    )

    return (
        <>
            <div className="flex justify-between items mb-5">
                <Typography fontSize='25px' fontWeight='medium' color='#342E59'>

                    {
                        previousPage === 'subscription' ?
                            (
                                <div className="flex items-center gap-x-2">
                                    <Link to='/dashboard/subscription-plan' className='cursor-pointer'>
                                        <ArrowBackIosNewIcon />
                                    </Link>    
                                    <Typography>Select Features</Typography>
                                </div>
                            )
                            :
                            <Typography>Features</Typography>
                    }


                </Typography>
                <div className='flex'>

                    {
                        previousPage === 'subscription' && (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#6C309C',
                                    borderRadius: '20px',
                                    '&:hover': {
                                        backgroundColor: '#6C309C',
                                    },
                                    padding: '0 30px'
                                }}
                                component={Link}
                                to='/dashboard/subscription-plan'
                                state={{
                                    selectedFeatures: [...new Set([...selectedFeatures, ...previousFeatures])],
                                    plan: plan,
                                    previousPage: 'features',
                                    openAddModal: openAddModal
                            }}
                            >
                                Select
                            </Button>
                        )
                    }
                    <Box sx={{
                        display: 'flex', alignItems: 'center', marginLeft: '20px',
                        backgroundColor: "white", borderRadius: '20px', padding: '0 5px', borderWidth: '1px', borderColor: 'gray', marginRight: '15px',
                    }}>


                        <SearchIcon sx={{
                            fontSize: '20px',
                            color: '#959595',
                        }} />
                        <InputBase
                            placeholder="Search…" sx={{ pl: 1 }}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#6C309C',
                            borderRadius: '20px',
                            '&:hover': {
                                backgroundColor: '#6C309C',
                            }
                        }}
                        onClick={() => handleIsAddModalOpen()}
                    >
                        <AddIcon sx={{ marginRight: '10px' }} />
                        Add
                    </Button>
                </div>
            </div>

            <FeaturesTable
                features={features}
                updateSelectedFeatures={setSelectedFeatures}
            />



            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap='wrap' marginTop="1rem">
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

            <AddFeaturesModal
                open={isAddModalOpen}
                handleClose={handleIsAddModalClose}
                setOpen={setIsAddModalOpen}
            />
        </>
    )
}

export default Features



