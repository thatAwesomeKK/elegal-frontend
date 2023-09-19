import { redirect } from 'next/navigation'
import React from 'react'

const ForgotPassword = () => {
    redirect('/auth?type=forgot-password')
    return <></>
}

export default ForgotPassword