import { Typography } from '@mui/material';
import Overview from './Overview';
import { WorldWideUsers } from './GoogleMap';
import UserDataTable from './UserDataTable';
import Dummy from '../../../components/dashboard/Dummy';



const Dashboard = () => {
    return (
        <>
            <Typography sx={{ fontSize: '25px', fontWeight: 'medium' }}>Dashboard</Typography>
            <Overview />
            <WorldWideUsers /> 
            <UserDataTable />
            {/* <Dummy /> */}
        </ >
    );
};

export default Dashboard;
