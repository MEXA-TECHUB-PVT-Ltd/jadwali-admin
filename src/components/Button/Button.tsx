import Button from '@mui/material/Button';
import { TString } from '../../types/types';

function CustomButton({ text }: TString) {
    return (
        <Button
            fullWidth
            variant='contained'
            sx={{
                backgroundColor: '#6C309C',
                borderRadius: '20px',
                '&:hover': {
                    backgroundColor: '#6C309C', 
                }
            }}
        >
            {text}
        </Button>
    );
}

export default CustomButton;
