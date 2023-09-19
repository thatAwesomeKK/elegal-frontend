'use client'
import { logout } from '@/lib/apiCalls/auth'
import Link from 'next/link'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { RiShoppingBasket2Line } from 'react-icons/ri'

interface PageProps {
    accessToken: string
}

function UserButton({ accessToken }: PageProps) {
    return (
        <>
            <li><Link href='/profile/orders' className="text-lg font-semibold"><RiShoppingBasket2Line className='h-6 w-6 mr-2' />Orders</Link></li>
            <li><Link href='/profile/dashboard' className="text-lg font-semibold"><CgProfile className='h-6 w-6 mr-2' />Profile</Link></li>
            <li><button onClick={() => logout(accessToken)} className='text-lg font-semibold'><FiLogOut className='h-6 w-6 mr-2' />Logout</button></li>
        </>
    )
}

export default UserButton