import {
    TabsContent
} from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { redirect } from 'next/navigation';
const AuthForms = dynamic(() => import('@/components/Forms/AuthForm'), { ssr: false, loading: () => <p>Loading....</p> })

interface PageProps {
    params: {
        authType: string
    },
    searchParams: {
        token?: string | null
    }
}

const page = ({ params: { authType }, searchParams: { token } }: PageProps) => {
    if (authType === "change-password" && (token === "" || !token)) {
        redirect("/auth/login")
    }

    return (
        <>
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
                    <AuthForms type={"changePassword"} token={token!} />
                </TabsContent>
            }
        </>
    )
}

export default page