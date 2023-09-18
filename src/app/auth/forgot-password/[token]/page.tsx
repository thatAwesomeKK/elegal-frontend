import ChangePasswordForm from '@/components/Forms/ChangePasswordForm';
import React from 'react'

interface PageProps {
    params: {
        token: string;
    };
}

const VerifyPasswordToken = ({ params: { token } }: PageProps) => {
    return <main className='h-[93.5vh] flex justify-center items-center'>
        <ChangePasswordForm token={token} />
    </main>
}

export default VerifyPasswordToken