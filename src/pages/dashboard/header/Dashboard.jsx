import { Typography } from '@mui/material';
import Overview from './Overview';
import { WorldWideUsers } from './GoogleMap';
import UserDataTable from './UserDataTable';
import Dummy from '../../../components/dashboard/Dummy';
import RecentFeedbacks from './RecentFeedbacks';



const Dashboard = () => {
    return (
      <>
        <Typography sx={{ fontSize: "25px", fontWeight: "medium" }}>
          Dashboard
        </Typography>
        <Overview />
        <WorldWideUsers />
        <UserDataTable />
        <RecentFeedbacks />
        {/* <Dummy /> */}
      </>
    );
};

export default Dashboard;
