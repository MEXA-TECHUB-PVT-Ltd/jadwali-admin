import PeopleIcon from '@mui/icons-material/People';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Typography, Card, CardContent, Grid, Icon } from '@mui/material';
import OverviewCard from '../../../components/dashboard/OverviewCard';

const Overview = () => {
    return (
        <Grid container spacing={3} mt={2}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <OverviewCard >
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Icon
                            className="icon"  
                            component={PeopleIcon}
                            sx={{
                                backgroundColor: 'rgba(199, 174, 219, 0.14)',
                                color: 'rgba(108, 48, 156, 1)',
                                fontSize: '4rem',
                                marginRight: '8px',
                                padding: '10px',
                                height: 'auto',
                                borderRadius: '10px',
                                transition: 'background-color 0.3s ease-in-out', 
                            }}
                        />
                        <div>
                            <Typography className="text" variant="body2" color='gray'> 
                                Active Users
                            </Typography>
                            <Typography className="text" variant="h4" fontWeight='medium'> 
                                150
                            </Typography>
                        </div>
                    </CardContent>
                </OverviewCard>

            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <OverviewCard>
                    <CardContent sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Icon
                            className="icon"
                            component={GroupAddIcon}
                            sx={{
                                backgroundColor: 'rgba(199, 174, 219, 0.14)',
                                color: 'rgba(108, 48, 156, 1)',
                                fontSize: '4rem',
                                marginRight: '8px',
                                padding: '10px',
                                height: 'auto',
                                borderRadius: '10px',
                                transition: 'background-color 0.3s ease-in-out',
                            }}
                        />
                        <div>
                            <Typography className="text" variant="body2" color='gray'>
                                Subscribed Users
                            </Typography>
                            <Typography className="text" variant="h4" fontWeight='medium'>
                                100
                            </Typography>
                        </div>
                    </CardContent>
                </OverviewCard>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <OverviewCard>
                    <CardContent sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Icon
                            className='icon'
                            component={ArrowCircleDownIcon}
                            sx={{
                                backgroundColor: 'rgba(199, 174, 219, 0.14)',
                                color: 'rgba(108, 48, 156, 1)',
                                fontSize: '4rem',
                                marginRight: '8px',
                                padding: '10px',
                                height: 'auto',
                                borderRadius: '10px',
                                transition: 'background-color 0.3s ease-in-out',
                            }}
                        />
                        <div>
                            <Typography className="text" variant="body2" color='gray'>
                                Total Downloads
                            </Typography>
                            <Typography className="text" variant="h4" fontWeight='medium'>
                                5000
                            </Typography>
                        </div>
                    </CardContent>
                </OverviewCard>
            </Grid>
        </Grid>
    )
}

export default Overview
