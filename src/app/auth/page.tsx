import React from 'react'
import LoginForm from '@/components/Forms/LoginForm'
import RegisterForm from '@/components/Forms/RegisterForm'
import ForgotPasswordForm from '@/components/Forms/ForgotPasswordForm'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/ui/tabs";
import AuthForms from '@/components/Forms/authForms';

type pageType = {
    params?: {
        slug?: string
    },
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}

const page = ({
    params,
    searchParams
}: pageType) => {

    console.log(searchParams)



    return (
        <section className='flex justify-center items-center h-[93.5vh] bg-gray-200'>
            <Tabs defaultValue={searchParams?.type ? searchParams?.type as string : "register"}>
                <TabsList className='w-full'>
                    <TabsTrigger className='w-full' value='login'>Login</TabsTrigger>
                    <TabsTrigger className='w-full' value='register'>Register</TabsTrigger>
                </TabsList>
                <TabsContent value={"register"}>
                    {/* <RegisterForm /> */}
                    <AuthForms type={searchParams?.type as string} />
                </TabsContent>
                <TabsContent value={"login"}>
                    <LoginForm />
                </TabsContent>
            </Tabs>
        </section>
    )
}

export default page