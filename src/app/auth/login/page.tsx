import { redirect } from 'next/navigation'
import React from 'react'

const Login = () => {
    redirect('/auth?type=login')
    return (
        <></>
    )
}

export default Login