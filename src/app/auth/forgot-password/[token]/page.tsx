import ChangePasswordForm from '@/components/Forms/ChangePasswordForm';
import React from 'react'

interface PageProps {
    params: {
        token: string;
    };
}

const VerifyPasswordToken = ({ params: { token } }: PageProps) => {
    return <ChangePasswordForm token={token} />
}

export default VerifyPasswordToken