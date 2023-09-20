import Link from 'next/link'
import React from 'react'
import { cookies } from 'next/headers'
import { Kaushan_Script } from 'next/font/google'
import { store } from '@/lib/redux/store'
import UserButton from './UserButton'

const kaushanScript = Kaushan_Script({ subsets: ['latin'], weight: '400', preload: true })

const Navbar = async () => {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const user = store.getState().user.user

    return (
        <nav className="navbar bg-white shadow-md px-4 justify-between w-full h-[40px]">
            <Link href="/" className={`${kaushanScript.className} text-2xl font-bold`}>
                E-Legal
            </Link>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered h-[35px] w-[250px]" />
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user?.pfp || "/assets/no_profile.png"} alt={user?.username || "Profile Picture"} />
                            {/* <img src={"/assets/no_profile.png"} /> */}
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                        {user && <UserButton user={user} accessToken={accessToken!}/>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar