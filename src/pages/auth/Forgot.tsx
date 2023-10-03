import React from 'react'
import FormLayout from '../../components/Form/Layout'
import CardLayout from '../../components/Card/CardLayout'
import Email from '../../components/Form/Email'
import ButtonLayout from '../../components/Button/Button';

const Forgot = () => {
    return (
        <FormLayout>
            <CardLayout title='JADWALI' subTitle='Forgot Password' description='Enter your Email address to send a verification code'>
                <div className='mb-12'>
                    <Email />
                </div>
                <ButtonLayout text='Send Code' />
            </CardLayout>
        </FormLayout>
    )
}

export default Forgot
