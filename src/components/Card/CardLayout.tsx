import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { TChildren } from '../../types/types';
import { CardContent, Typography } from '@mui/material';

export default function CardLayout({ children, title, subTitle, description }: TChildren) {
    return (
        <Box className='flex bg-[#C7AEDB] justify-center items-center h-screen'>
            <Card className='sm:w-[450px] w-[80%]' sx={{ borderRadius: '30px' }}>
                <CardContent className='m-3'>
                    <Typography
                        gutterBottom
                        sx={{
                            mb: 6, fontSize: '30px',
                            color: '#6C309C',
                            fontWeight: 'medium',
                        }}
                    >
                        {title}
                    </Typography>
                    <div className='mb-12'>
                        <Typography
                            variant='h6'
                            sx={{ fontSize: '20px' }}
                        >
                            {subTitle}
                        </Typography>
                        <Typography
                            variant="body2" 
                            gutterBottom
                            sx={{ color: 'GrayText', marginTop: '10px' }}
                        >
                            {description}
                        </Typography>
                    </div>
                    {children}
                </CardContent>
            </Card>
        </Box>
    );
}
