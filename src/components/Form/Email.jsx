import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Email = ({field}) => {
    return (
        <TextField
            id="outlined-basic"
            variant="outlined"
            type='email'
            placeholder='Enter Your Email'
            fullWidth
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    borderColor: 'rgba(0, 0, 0, 0.04)',
                    borderWidth: '0px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.04)',
                },
                // mb: 3,
                p: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '20px',

            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px' }} />
                    </InputAdornment>
                ),
            }}
            size='small'
            {...field}
        />
    )
}

export default Email
