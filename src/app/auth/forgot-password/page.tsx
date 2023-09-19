import ForgotPasswordForm from '@/components/Forms/ForgotPasswordForm'
import { redirect } from 'next/navigation'
import React from 'react'

const ForgotPassword = () => {

    redirect('/auth?type=forgot-password')

    return <main className='h-[93.5vh] flex justify-center items-center'>
        <ForgotPasswordForm />
    </main>
}

export default ForgotPassword