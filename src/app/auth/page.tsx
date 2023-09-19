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

    let type = searchParams?.type as string || "register";
    let token = searchParams?.token as string || "";
    console.log(type)
    return (
        <section className='flex w-full justify-center items-center mt-[20px] md:mt-[80px]'>
            <Tabs
                className='w-full sm:w-[472px] h-max rounded-lg'
                defaultValue={type}>
                <TabsList className='w-full'>
                    {(type === "login" || type === 'register') && (
                        <>
                            {console.log("coming")}
                            <TabsTrigger className='w-full' value='login'>Login</TabsTrigger>
                            <TabsTrigger className='w-full' value='register'>Register</TabsTrigger>
                        </>
                    )}
                    {type === "forgot-password" && (
                        <TabsTrigger className='w-full' value='forgot-password'>Forgot Password</TabsTrigger>
                    )}
                    {type === "change-password" && (
                        <TabsTrigger className='w-full' value='Change-password'>Change Password</TabsTrigger>
                    )}
                </TabsList>
                {(type === "login" || type === 'register') && (
                    <>
                        <TabsContent value={"register"} className='w-full'>
                            <AuthForms type={"register"} />
                        </TabsContent>
                        <TabsContent value={"login"} className='w-full'>
                            <AuthForms type={"login"} />
                        </TabsContent>
                    </>
                )}
                {type === "forgot-password" &&
                    <TabsContent value={"forgot-password"} className='w-full'>
                        <AuthForms type={"forgotPassword"} />
                    </TabsContent>
                }
                {type === "change-password" &&
                    <TabsContent value={"change-password"} className='w-full'>
                        <AuthForms type={"changePassword"} token={token} />
                    </TabsContent>
                }
            </Tabs>
        </section>
    )
}

export default page