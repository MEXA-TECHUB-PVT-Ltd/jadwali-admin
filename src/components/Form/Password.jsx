import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Password = ({ placeholder, field }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <TextField
            id="outlined-basic"
            placeholder={placeholder}
            variant="outlined"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    borderColor: 'rgba(0, 0, 0, 0.04)',
                    borderWidth: '0px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.04)', 
                },
                // mb: 2,
                p: 0,
                borderRadius: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px' }} />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton edge="end" onClick={handleTogglePassword}>
                            {showPassword ? <Visibility sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px' }} /> : <VisibilityOff sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px' }} />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            size='small'
            {...field}
        />
    );
};

export default Password;
