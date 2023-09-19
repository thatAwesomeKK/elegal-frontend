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

    return (
        <section className='flex justify-center items-center mt-[80px]'>
            <Tabs
                className='min-w-[472px] rounded-lg'
                defaultValue={searchParams?.type !== "forgot-password" ? searchParams?.type as string || "register" : "forgotPassword"}>
                <TabsList className='w-full'>
                    {type !== "forgot-password" ? (<>
                        <TabsTrigger className='w-full' value='login'>Login</TabsTrigger>
                        <TabsTrigger className='w-full' value='register'>Register</TabsTrigger>
                    </>) : (
                        <TabsTrigger className='w-full' value='forgotPassword'>Forgot Password</TabsTrigger>
                    )}
                </TabsList>
                {type !== "" ? (<>
                    <TabsContent value={"register"} className='w-full'>
                        <AuthForms type={"register"} />
                    </TabsContent>
                    <TabsContent value={"login"} className='w-full'>
                        <AuthForms type={"login"} />
                    </TabsContent>
                </>) : (
                    <TabsContent value={"forgotPassword"} className='w-full'>
                        <AuthForms type={"forgotPassword"} />
                    </TabsContent>
                )}
            </Tabs>
        </section>
    )
}

export default page