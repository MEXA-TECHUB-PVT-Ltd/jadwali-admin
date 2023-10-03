import CardLayout from '../../components/Card/CardLayout'
import Password from '../../components/Form/Password';
import ButtonLayout from '../../components/Button/Button';


const ResetPassword = () => {

    return (
            <div className='bg-[#C7AEDB]'>
                <CardLayout title='JADWALI' subTitle='Reset Password' description='Create a strong password'>
                    <div>
                        <Password placeholder={"Enter Your Password"} />
                    </div>
                    <div>
                        <Password placeholder={"Confirm Password"} />
                    </div>
                    <div className="mt-10">
                        <ButtonLayout text='Reset Password' />
                    </div>
                </CardLayout>
            </div>
    )
}

export default ResetPassword
