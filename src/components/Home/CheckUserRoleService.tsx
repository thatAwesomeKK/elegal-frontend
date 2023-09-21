import { store } from '@/lib/redux/store'
import React from 'react'
import { Services } from './Services/Services'
import BestMatchServices from './Services/BestMatchServices'
import AvailableServices from './Services/AvailableServices'
import { fetchMatchServiceRequest } from '@/lib/apiCalls/service'
import { cookies } from 'next/headers'
import { Service } from '@/lib/typings'

const CheckUserRoleService = async () => {
    const user = store.getState().user.user
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    const services: Service[] = await fetchMatchServiceRequest(accessToken)
    return (
        <>
            {(!user || user?.role === 'buyer') ? <Services />
                :
                (<>
                    {services && <BestMatchServices services={services} />}
                    <hr className="border-1 border-gray-300" />
                    <AvailableServices />
                </>)}
        </>
    )
}

export default CheckUserRoleService