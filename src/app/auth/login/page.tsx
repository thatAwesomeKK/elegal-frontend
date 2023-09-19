import LoginForm from '@/components/Forms/LoginForm'
import { redirect } from 'next/navigation'
import React from 'react'

const Login = () => {

    redirect('/auth?type=login')

    return (
        <section className='flex justify-center items-center h-[93.5vh] bg-gray-200'>
            <LoginForm />
        </section>
    )
}

export default Login