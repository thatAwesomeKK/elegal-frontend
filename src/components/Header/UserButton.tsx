'use client'
import { logout } from '@/lib/apiCalls/auth'
import { User } from '@/lib/typings'
import Link from 'next/link'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { RiShoppingBasket2Line } from 'react-icons/ri'
import { MdAlternateEmail } from 'react-icons/md'

interface PageProps {
    user: User
}

function UserButton({ user }: PageProps) {
    return (
        <><li><Link href='/contact' className="text-lg font-semibold"><MdAlternateEmail className='h-6 w-6 mr-2' />Contact Us</Link></li>
            {user ? <>
                <li><Link href='/profile/orders' className="text-lg font-semibold"><RiShoppingBasket2Line className='h-6 w-6 mr-2' />Orders</Link></li>
                <li><Link href='/profile/dashboard' className="text-lg font-semibold"><CgProfile className='h-6 w-6 mr-2' />Profile</Link></li>
                <li><button onClick={() => logout()} className='text-lg font-semibold'><FiLogOut className='h-6 w-6 mr-2' />Logout</button></li>
            </> : <li><Link href='/auth/login' className="text-lg font-semibold"><FiLogIn className='h-6 w-6 mr-2' />Sign In</Link></li>}
        </>
    )
}

export default UserButton