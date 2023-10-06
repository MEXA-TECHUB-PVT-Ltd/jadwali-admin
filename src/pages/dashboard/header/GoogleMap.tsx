import { Card, CardContent, Typography, LinearProgress, Grid } from '@mui/material';
import AreaChart from '../../../components/dashboard/AreaChart';
import pak from '../../../../public/images/pak.png'
import egypt from '../../../../public/images/egypt.png'
import usa from '../../../../public/images/usa.png'
import aus from '../../../../public/images/aus.png'
import map from '../../../../public/images/map.png'



export const WorldWideUsers = () => {
    return (
        <Grid container spacing={2} mt={5}>
            <Grid item xs={12} md={12} lg={7} className='flex'>
                <Card sx={{ borderRadius: '10px', flexGrow: 1 }}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h6" fontWeight='medium'>World Wide Users</Typography>
                                <Typography color="textSecondary">Last Research Report</Typography>
                                <div className='mt-16'>
                                    <img src={map} alt={"MAP"}  />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography fontSize={'22px'} fontWeight={'medium'} sx={{ marginBottom: '30px' }}>Countries</Typography>
                                {renderCountryProgress("Pakistan", 55, pak)}
                                {renderCountryProgress("Egypt", 70, egypt)}
                                {renderCountryProgress("USA", 100, usa)}
                                {renderCountryProgress("AUSTRALIA", 80, aus)}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={12} lg={5}>
                <AppStatistics />
            </Grid>
        </Grid>
    );
};

const AppStatistics = () => {
    return (
        <Card sx={{ borderRadius: '10px', flexGrow: 1 }}>
            <CardContent>
                <Typography variant="h6">App Statistics</Typography>
                <Typography color="textSecondary">Last Month report</Typography>
                <div className='mt-5 bg-gray-300'>
                    <AreaChart />
                </div>
            </CardContent>
        </Card>
    );
};

const renderCountryProgress = (countryName: any, value: any, imageSrc: string) => (
    <div className="mt-2 mb-5">
        <div className="flex items-center mb-3">
            <div className='me-5'>
                <img src={imageSrc} alt={countryName} width="60" height="60" />
            </div>
            <Typography fontSize={'18px'} fontWeight={'medium'}>{countryName}</Typography>
        </div>
        <div className="relative">
            <LinearProgress
                variant="determinate"
                value={value}
                style={{ borderRadius: '20px', backgroundColor: '#EDEDED' }}
                sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#6C309C', borderRadius: '20px' } }}
            />
            <Typography
                className="absolute top-[-30px] right-0 text-xs text-purple-700"
            >
                {value}%
            </Typography>
        </div>
    </div>
);
