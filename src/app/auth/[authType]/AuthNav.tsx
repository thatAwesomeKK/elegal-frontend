import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

interface PageProps {
    authType: string;
}

const AuthNav = ({ authType }: PageProps) => {
    return (
        <TabsList className='w-full'>
            {(authType === "login" || authType === 'register') && (
                <>
                    <TabsTrigger className='w-full' value='login'>Login</TabsTrigger>
                    <TabsTrigger className='w-full' value='register'>Register</TabsTrigger>
                </>
            )}
            {authType === "forgot-password" && (
                <TabsTrigger className='w-full' value='forgot-password'>Forgot Password</TabsTrigger>
            )}
            {authType === "change-password" && (
                <TabsTrigger className='w-full' value='Change-password'>Change Password</TabsTrigger>
            )}
        </TabsList>
    )
}

export default AuthNav