import AuthForms from "@/components/Forms/AuthForm";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/ui/tabs";
import { redirect } from 'next/navigation';

interface PageProps {
    params: {
        authType: string
    },
    searchParams: {
        token: string
    }
}

const page = ({ params: { authType }, searchParams: { token } }: PageProps) => {
    if (authType === "change-password" && (token === "" || !token)) {
        redirect("/auth/login")
    }

    return (
        <section className='flex w-full justify-center items-center mt-[20px] md:mt-[80px]'>
            <Tabs
                className='w-full sm:w-[472px] h-max rounded-lg'
                defaultValue={authType || "login"}>
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
                {(authType === "login" || authType === 'register') && (
                    <>
                        <TabsContent value={"register"} className='w-full'>
                            <AuthForms type={"register"} />
                        </TabsContent>
                        <TabsContent value={"login"} className='w-full'>
                            <AuthForms type={"login"} />
                        </TabsContent>
                    </>
                )}
                {authType === "forgot-password" &&
                    <TabsContent value={"forgot-password"} className='w-full'>
                        <AuthForms type={"forgotPassword"} />
                    </TabsContent>
                }
                {authType === "change-password" &&
                    <TabsContent value={"change-password"} className='w-full'>
                        <AuthForms type={"changePassword"} token={token} />
                    </TabsContent>
                }
            </Tabs>
        </section>
    )
}

export default page