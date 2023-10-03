import { Typography } from '@mui/material';
import Overview from './Overview';
import { WorldWideUsers } from './GoogleMap';
import UserDataTable from './UserDataTable';



const Dashboard = () => {
    return (
        <div>
            <Typography sx={{ fontSize: '25px', fontWeight: 'medium' }}>Dashboard</Typography>
            <Overview />
            <WorldWideUsers />
            <UserDataTable />
        </div >
    );
};

export default Dashboard;
