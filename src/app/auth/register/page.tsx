import RegisterForm from '@/components/Forms/RegisterForm'
import { redirect } from 'next/navigation'
import React from 'react'

const Register = () => {

    redirect('/auth?type=register')

    return (
        <section className='flex justify-center items-center h-[93.5vh] bg-gray-200'>
            <RegisterForm />
        </section>
    )
}

export default Register