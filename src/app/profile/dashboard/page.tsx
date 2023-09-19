import ProfileForm from '@/components/Forms/ProfileForm'
import UpdatePersonalUserForm from '@/components/Forms/UpdatePersonalUserForm'
import UpdateProfessionalUserForm from '@/components/Forms/UpdateProfessionalUserForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getProfile } from '@/lib/apiCalls/profile'
import { cookies } from 'next/headers'
import React from 'react'

const Dashboard = async () => {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    const user = await getProfile(accessToken!)
    return (
        <main className='flex w-full justify-center items-center mt-[20px] md:mt-[80px]'>
            {/* <Tabs defaultValue="personal" className="w-[70%] flex flex-col justify-center items-center">
                <TabsList className='w-[90%]'>
                    <TabsTrigger className='w-1/2' value="personal">Personal</TabsTrigger>
                    <TabsTrigger className='w-1/2' value="professional">Professional</TabsTrigger>
                </TabsList>
                <TabsContent className='w-[90%]' value="personal"><UpdatePersonalUserForm user={user} accessToken={accessToken!} /></TabsContent>
                <TabsContent className='w-[90%]' value="professional"><UpdateProfessionalUserForm user={user} accessToken={accessToken!} /></TabsContent>
            </Tabs> */}
            <section className='w-full sm:w-[700px] h-max'>
                <ProfileForm user={user} accessToken={accessToken!} />
            </section>
        </main>
    )
}

export default Dashboard