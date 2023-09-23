import ProfileForm from '@/components/Forms/ProfileForm'
import { getProfile } from '@/lib/apiCalls/profile'
import { cookies } from 'next/headers'
import React from 'react'

const Dashboard = async () => {
    const cookieStore = cookies()
    const session = cookieStore.get('sid')?.value
    const user = await getProfile(session)

    return (
        <main className='flex w-full justify-center items-center mt-[20px] md:mt-[80px]'>
            <section className='w-full sm:w-[700px] h-max'>
                <ProfileForm user={user} />
            </section>
        </main>
    )
}

export default Dashboard