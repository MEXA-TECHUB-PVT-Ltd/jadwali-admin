import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { TChildren } from '../../types/types';
import { CardContent, Typography } from '@mui/material';
import logo from '../../../public/images/logopink.png'


export default function CardLayout({ children, title, subTitle, description }: TChildren) {
    return (
        <Box className='flex bg-[#C7AEDB] justify-center items-center h-screen'>
            <Card className='sm:w-[500px] w-[80%]' sx={{ borderRadius: '30px' }}>
                <CardContent className='m-3'>
                    <div className='flex justify-center items-center mt-3 mb-5'>
                        <img src={logo} alt="Logo" width={150} height={150} />
                    </div>
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
