import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { fetchOrderWithId } from '@/lib/apiCalls/service'
import { Service, User } from '@/lib/typings'
import { cookies } from 'next/headers'
import React from 'react'
import { store } from '@/lib/redux/store'
import ActionButtons from './ActionButtons'
import Image from 'next/image'
import dynamic from 'next/dynamic'
const AppliedServiceProviders = dynamic(() => import('./AppliedServiceProviders'), { ssr: false, loading: () => <p>Loading....</p> })

interface PageProps {
    params: {
        orderId: string
    }
}

const OrderDetails = async ({ params: { orderId } }: PageProps) => {
    const cookieStore = cookies()
    const session = cookieStore.get('sid')?.value
    const service: Service = await fetchOrderWithId(session!, orderId)

    return (
        <main className='flex justify-between flex-col xl:flex-row items-center py-5 px-8 w-full h-[93.5vh]'>
            <ServiceInfo service={service} />\
            <section className='flex-1 flex flex-col justify-center items-center py-10 h-[80vh]'>
                <h2 className='font-bold text-3xl text-gray-600'>Applied Service Providers</h2>
                <hr className="border-1 w-44 border-gray-400" />
                <AppliedServiceProviders service={service} />
            </section>
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


const ServiceInfo = ({ service }: { service: Service }) => {
    const user = store.getState().user.user
    return (
        <section className='flex-1 xl:h-full gap-5 flex flex-col justify-center items-center'>
            <div className='rounded-lg bg-white shadow-lg p-10 xl:h-[50%] h-full w-full 2xl:w-[70%] xl:w-[80%] lg:w-[70%] md:w-[80%] flex flex-col justify-between items-start'>
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
                        <Avatar className='border-2 border-gray-300 w-12 h-12'>
                            <AvatarImage src={service.LegalProviderId.pfp} />
                            <AvatarFallback><Image className='object-cover' src="/assets/no_profile.png" alt='' height={50} width={50} /></AvatarFallback>
                        </Avatar>
                        <p>{service.LegalProviderId.username}</p>
                    </> : (<p className='text-red-500 font-semibold'>No Service Provider Assigned</p>)}
                </div>
                <ActionButtons user={user} service={service} />
                <Progress user={user} service={service} />
            </div>
        </section>
    )
}


export default OrderDetails