import React, { useState } from 'react';
import FormLayout from '../../components/Form/Layout';
import CardLayout from '../../components/Card/CardLayout';
import ButtonLayout from '../../components/Button/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const VerificationCode = () => {
    const [values, setValues] = useState(['', '', '', '']);
    const inputRefs = Array.from({ length: 4 }, () => React.createRef());

    const handleChange = (e: any, index: any) => {
        e.preventDefault();
        const val = e.target.value;
        if (/^[0-9]$/.test(val) || val === '') {
            const newValues = [...values];
            newValues[index] = val;
            setValues(newValues);
            if (val !== '') {
                focusNextInput(index);
            }
        }
    };

    const focusNextInput = (index: any) => {
        if (index < inputRefs.length - 1) {
            const nextInput: any = inputRefs[index + 1].current;
            nextInput && nextInput.focus();
        }
    };

    return (
        <FormLayout>
            <CardLayout title='JADWALI' subTitle='Forgot Password' description='Enter your Email address to send a verification code'>
                <Grid container spacing={2} justifyContent="center" className='mb-12'>
                    {Array(4).fill(null).map((_, index) => (
                        <Grid item key={index}>
                            <TextField
                                value={values[index]}
                                onChange={(e) => handleChange(e, index)}
                                variant="outlined"
                                type="number"
                                inputRef={inputRefs[index]}
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                        max: 9,
                                        pattern: "[0-9]{1}",
                                        style: { textAlign: 'center', width: '2em' }
                                    }
                                }}
                                sx={{
                                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                        '-webkit-appearance': 'none',
                                        margin: 0,
                                    },
                                    '& input[type=number]': {
                                        '-moz-appearance': 'textfield',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '20px',
                                        borderColor: 'rgba(0, 0, 0, 0.04)',
                                        borderWidth: '0px',
                                    },
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    borderRadius: '20px',
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
                <ButtonLayout text='Send Code' />
            </CardLayout>
        </FormLayout>
    )
}

export default VerificationCode;
