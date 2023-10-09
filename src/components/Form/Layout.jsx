import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const FormLayout = ({ children, link }) => {
    return (
        <div className='bg-[#C7AEDB] overflow-hidden h-screen'>
            <Link to={link ? link : '#'}>
                <IconButton
                    aria-label="back"
                    className='absolute left-4 top-4'
                    color="inherit"
                    sx={{ margin: 0 }}
                >
                    <ArrowBackIcon sx={{ color: 'white' }} />
                </IconButton>
            </Link>
            <div>
                {children}
            </div>
        </div>
    );
};

export default FormLayout;
