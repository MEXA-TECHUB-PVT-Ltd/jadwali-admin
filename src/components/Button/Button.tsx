import Button from '@mui/material/Button';
import { TString } from '../../types/types';

function CustomButton({ text, type, disabled, onClick }: any) {
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
            type={type ? type : 'button'}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </Button>
    );
}

export default CustomButton;
