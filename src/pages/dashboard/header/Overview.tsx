import PeopleIcon from '@mui/icons-material/People';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Typography, Card, CardContent, Grid, Icon } from '@mui/material';

const Overview = () => {
    return (
        <Grid container spacing={3} mt={2}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <Card sx={{ borderRadius: '10px' }}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Icon
                            component={PeopleIcon}
                            sx={{
                                backgroundColor: '#D1B8E4',
                                color: 'rgba(108, 48, 156, 1)',
                                fontSize: '4rem',
                                marginRight: '8px',
                                padding: '10px',
                                height: 'auto',
                                borderRadius: '10px'
                            }}
                        />
                        <div>
                            <Typography variant="body2" color='gray'>
                                Active Users
                            </Typography>
                            <Typography variant="h4" fontWeight='medium'>
                                150
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <Card sx={{ borderRadius: '10px' }}>
                    <CardContent sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Icon component={GroupAddIcon} sx={{
                            backgroundColor: '#D1B8E4',
                            color: 'rgba(108, 48, 156, 1)',
                            fontSize: '4rem',
                            marginRight: '8px',
                            padding: '10px',
                            height: 'auto',
                            borderRadius: '10px'
                        }} />
                        <div>
                            <Typography variant="body2" color='gray'>
                                Subscribed Users
                            </Typography>
                            <Typography variant="h4" fontWeight='medium'>
                                100
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <Card sx={{ borderRadius: '10px' }}>
                    <CardContent sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Icon
                            component={ArrowCircleDownIcon}
                            sx={{
                                backgroundColor: '#D1B8E4',
                                color: 'rgba(108, 48, 156, 1)',
                                fontSize: '4rem',
                                marginRight: '8px',
                                padding: '10px',
                                height: 'auto',
                                borderRadius: '10px'

                            }}
                        />
                        <div>
                            <Typography variant="body2" color='gray'>
                                Total Downloads
                            </Typography>
                            <Typography variant="h4" fontWeight='medium'>
                                5000
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Overview
