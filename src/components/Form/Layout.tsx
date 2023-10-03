import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TChildren } from '../../types/types';

const FormLayout = ({ children }: TChildren) => {
    return (
        <div className='bg-[#C7AEDB]'>
            <IconButton
                aria-label="back"
                className='absolute left-4 top-4'
                color="inherit"
                sx={{margin: 0}}
            >
                <ArrowBackIcon sx={{ color: 'white' }} />
            </IconButton>
            <div>
                {children}
            </div>
        </div>
    );
};

export default FormLayout;
