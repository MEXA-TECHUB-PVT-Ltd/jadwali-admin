import { useState } from 'react';
import UserTable from '../../../components/dashboard/UserTable';
import { Button, Typography } from '@mui/material';
import { users } from '../../../utils/dashboard';


const UserDataTable = () => {

    return (
        <>
            <div className="flex justify-between items mt-10 mb-5">
                <Typography fontSize='25px'>Recent Users</Typography>
                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: '#6C309C',
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: '#6C309C',
                        }
                    }}
                >
                    View All Users
                </Button>
            </div>
            <UserTable
                users={users}
            />
        </>
    );
}

export default UserDataTable;
