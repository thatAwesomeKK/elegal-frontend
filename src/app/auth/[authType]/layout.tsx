import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AuthNav from "./AuthNav"

interface PageProps {
    params: {
        authType: string
    },
    children: React.ReactNode
}

export default function AuthLayout({
    params: { authType },
    children,
}: PageProps) {
    return <section className='flex w-full justify-center items-center mt-[20px] md:mt-[80px]'>
        <Tabs
            className='w-full sm:w-[472px] h-max rounded-lg'
            defaultValue={authType || "login"}>
            <AuthNav authType={authType} />
            {children}
        </Tabs>
    </section>
}