import CardLayout from '../../components/Card/CardLayout'
import { Typography } from '@mui/material'
import Email from '../../components/Form/Email';
import Password from '../../components/Form/Password';
import ButtonLayout from '../../components/Button/Button';
import { Link } from 'react-router-dom'


const SignIn = () => {

    return (
        <>
            <div className='bg-[#C7AEDB]'>
                <CardLayout title='JADWALI' subTitle='Sign In' description='Sign in to your jadwali account'>
                    <div>
                        <Email />
                    </div>
                    <div>
                        <Password placeholder='Enter Your Password' />
                    </div>
                    <Link to={'/auth/forgot'}>
                        <Typography className='text-end' sx={{ fontWeight: 'medium' }} color='#6C309C'>Forgot Password?</Typography>
                    </Link>
                    <div className="mt-10">
                        <ButtonLayout text='Sign In' />
                    </div>
                </CardLayout>
            </div>
        </>
    )
}

export default SignIn
