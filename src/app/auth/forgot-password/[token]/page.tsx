import ChangePasswordForm from '@/components/Forms/ChangePasswordForm';
import React from 'react'
import { redirect } from 'next/navigation'
interface PageProps {
    params: {
        token: string;
    };
}

const VerifyPasswordToken = ({ params: { token } }: PageProps) => {

    redirect(`/auth?type=forgot-password?&token=${token}`)

    return <main className='h-[93.5vh] flex justify-center items-center'>
        <ChangePasswordForm token={token} />
    </main>
}

export default VerifyPasswordToken