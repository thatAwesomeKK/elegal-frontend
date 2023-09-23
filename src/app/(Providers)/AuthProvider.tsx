import { storeUser } from "@/lib/redux/slice/userSlice"
import { store } from "@/lib/redux/store"
import PreLoader from "./Preloader"
import { getProfileRedux } from "@/lib/apiCalls/profile"
import { cookies } from "next/headers"

async function AuthProvider({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies()
    const session = cookieStore.get('sid')?.value
    const user = await getProfileRedux(session!)

    store.dispatch(storeUser(user))

    return (
        <>
            <PreLoader user={user} />
            {children}
        </>
    )
}
export default AuthProvider