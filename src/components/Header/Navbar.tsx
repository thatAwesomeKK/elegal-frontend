import Link from 'next/link'
import React from 'react'
import { Kaushan_Script } from 'next/font/google'
import { store } from '@/lib/redux/store'
import dynamic from 'next/dynamic'
import UserButton from './UserButton'
const UserImage = dynamic(() => import('./UserImage'), { ssr: false })

const kaushanScript = Kaushan_Script({ subsets: ['latin'], weight: '400', preload: true })

const Navbar = async () => {
    const user = store.getState().user.user

    return (
        <nav className="navbar bg-white shadow-md px-4 justify-between w-full h-full max-h-[40px]">
            <Link href="/" prefetch={false} className={`${kaushanScript.className} text-2xl font-bold`}>
                E-Legal
            </Link>
            <div className="flex-none gap-2">
                {/* <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered h-[35px] w-[250px]" />
                </div> */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <UserImage pfp={user?.pfp} />
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                        <UserButton user={user} />
                    </ul>
                </div>
            </div>
        </nav>
    )
}



export default Navbar