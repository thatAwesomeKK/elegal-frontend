import React from 'react'
import { redirect } from 'next/navigation'
interface PageProps {
    params: {
        token: string;
    };
}

const VerifyPasswordToken = ({ params: { token } }: PageProps) => {
    redirect(`/auth?type=forgot-password?&token=${token}`)
    return<></>
}

export default VerifyPasswordToken