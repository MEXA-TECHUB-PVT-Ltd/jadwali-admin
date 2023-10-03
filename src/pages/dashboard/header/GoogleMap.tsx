import { Card, CardContent, Typography, LinearProgress, Grid } from '@mui/material';
export const WorldWideUsers = () => {
    return (
        <Grid container spacing={2} mt={5}>
            <Grid item xs={12} md={12} lg={6}>
                <Card sx={{ borderRadius: '10px' }}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" fontWeight='medium'>World Wide Users</Typography>
                                <Typography color="textSecondary">Last Research Report</Typography>
                                <div className='mt-5 bg-slate-100'>
                                    Map Placeholder
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography fontSize={'22px'} fontWeight={'medium'} sx={{ marginBottom: '30px' }}>Countries</Typography>
                                {renderCountryProgress("Country 1", 75)}
                                {renderCountryProgress("Country 2", 50)}
                                {renderCountryProgress("Country 3", 25)}
                                {renderCountryProgress("Country 4", 100)}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
                <AppStatistics />
            </Grid>
        </Grid>
    );
};

const AppStatistics = () => {
    return (
        <Card sx={{ borderRadius: '10px' }}>
            <CardContent>
                <Typography variant="h6">App Statistics</Typography>
                <Typography color="textSecondary">Last Month report</Typography>
                <div className='mt-5 bg-gray-300'>
                    Smooth Line Chart Placeholder
                </div>
            </CardContent>
        </Card>
    );
};

const renderCountryProgress = (countryName: any, value: any) => (
    <div className="mt-2 mb-5">
        <div className="flex mb-3">
            <div className='bg-[#6C309C] me-5 p-2'>
                Img
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
