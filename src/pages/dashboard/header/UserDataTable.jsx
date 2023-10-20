import { useEffect, useState } from 'react';
import UserTable from '../../../components/dashboard/UserTable';
import { Button, Typography } from '@mui/material';
import { users } from '../../../utils/dashboard';
import { Link } from 'react-router-dom';
import { get } from '../../../server/server';


const UserDataTable = () => {

      const [allUsers, setAllUsers] = useState([]);


      const fetchAllUsers = async () => {
        const { res, err } = await get("/users/get");
        if (err) {
          console.error(err);
        }
        if (res) {
          setAllUsers(res.result);
        }
      };

    
    useEffect(() => {
        fetchAllUsers();
    }, [])
      

    return (
      <>
        <div className="flex justify-between items-center mt-10 mb-5">
          <Typography fontSize="25px">Recent Users</Typography>
          <Button
            variant="contained"
            component={Link}
            to={"/dashboard/all-users"}
            sx={{
              backgroundColor: "#6C309C",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#6C309C",
              },
            }}
          >
            View All Users
          </Button>
        </div>
        <UserTable users={allUsers} />
      </>
    );
}

export default UserDataTable;
