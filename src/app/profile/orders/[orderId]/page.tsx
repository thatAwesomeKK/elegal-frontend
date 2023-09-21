import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { fetchOrderWithId, fetchServiceWithId } from '@/lib/apiCalls/service'
import { Service, User } from '@/lib/typings'
import { cookies } from 'next/headers'
import React from 'react'
import { store } from '@/lib/redux/store'
import ActionButtons from './ActionButtons'
import dynamic from 'next/dynamic'

const PotentialProvidersCard = dynamic(() => import('@/components/Orders/PotentialProvidersCard'))

interface PageProps {
    params: {
        orderId: string
    }
}

const OrderDetails = async ({ params: { orderId } }: PageProps) => {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    const service: Service = await fetchOrderWithId(accessToken, orderId)

    const user = store.getState().user.user



    return (
        <main className={`w-full flex flex-row p-8  ${service?.PotentialProviders?.length > 0 ? "justify-between items-start" : "justify-center items-center"} gap-5 h-content-height`}>
            <section className=' h-full flex justify-center items-start w-full max-w-[40rem]'>
                <div className='bg-white shadow-lg p-10  flex flex-col justify-between items-start gap-3'>
                    <div>
                        <h2 className='text-3xl font-bold capitalize'>{service.type}({service.caseType})</h2>
                    </div>
                    <div>
                        <h4 className='text-xl font-semibold'>Description:</h4>
                        <p>{service.description}</p>
                    </div>
                    <p><span className='font-medium text-lg'>Location: </span> {service.city}, {service.state}</p>
                    <div className='flex gap-3 items-center'>
                        {service.LegalProviderId ? <>
                            <Avatar>
                                <AvatarImage src={service.LegalProviderId.pfp} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p>{service.LegalProviderId.username}</p>
                        </> : (<p className='text-red-500 font-semibold'>No Service Provider Assigned</p>)}
                    </div>
                    <ActionButtons user={user} accessToken={accessToken!} service={service} />
                    <Progress user={user} service={service} />
                </div>
            </section>
            {service.PotentialProviders?.length > 0 && <section className='flex items-start justify-start w-full'>
                <div className=' flex flex-col justify-center items-center h-full overflow-hidden overflow-y-scroll  gap-10 scrollbar-hide'>
                    <h2 className='font-bold text-3xl text-gray-600'>Applied Service Providers</h2>
                    <hr className="border-1 w-44 border-gray-400" />
                    <div className="flex flex-wrap gap-5">
                        {service.PotentialProviders.map((provider, i) => (
                            <PotentialProvidersCard service={service} accessToken={accessToken!} provider={provider} key={i} />
                        ))}
                    </div>
                </div>
            </section>}
        </main>
    )
}

interface Props {
    user: User
    service: Service
}

const Progress = ({ user, service }: Props) => {
    const checkLife = (stage: string) => {
        if (service.life === 'created' && stage === 'created')
            return true

        if (service.life === 'assigned' && (stage === 'assigned' || stage === 'created'))
            return true

        if (service.life === 'paid' && (stage === 'paid' || stage === 'assigned' || stage === 'created'))
            return true

        if (service.life === 'completed' && (stage === 'completed' || stage === 'paid' || stage === 'assigned' || stage === 'created'))
            return true

        if (service.life === 'received' && (stage === 'received' || stage === 'completed' || stage === 'paid' || stage === 'assigned' || stage === 'created'))
            return true
        return false
    }
    return (
        <>{
            !checkLife('received') ? <ul className="steps w-full">
                <li className={`step ${checkLife("created") && "step-primary"}`}>Created</li>
                <li className={`step ${checkLife("assigned") && "step-primary"}`}>Service Provider Assigned</li>
                <li className={`step ${checkLife("paid") && "step-primary"}`}>Paid</li>
                <li className={`step ${checkLife("completed") && "step-primary"}`}>Completed</li>
                {user?.role === "buyer" ? <li className={`step ${checkLife("received") && "step-primary"}`}>Recieved</li> : <li className={`step ${checkLife("received") && "step-primary"}`}>Delivered</li>}
            </ul> : <ul className="steps w-full">
                <li className='step step-success'>Created</li>
                <li className='step step-success'>Service Provider Assigned</li>
                <li className='step step-success'>Paid</li>
                <li className='step step-success'>Completed</li>
                {user?.role === "buyer" ? <li className='step step-success'>Recieved</li> : <li className='step step-success'>Delivered</li>}
            </ul>
        }</>)
}


export default OrderDetails