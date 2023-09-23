import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { fetchOrderWithId } from '@/lib/apiCalls/service'
import { Provider, Service, User } from '@/lib/typings'
import { cookies } from 'next/headers'
import React from 'react'
import { store } from '@/lib/redux/store'
import ActionButtons from './ActionButtons'
import PotentialProvidersCard from '@/components/Orders/PotentialProvidersCard'
import { setTimeout } from 'timers/promises'

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
            <ServiceInfo service={service} />
            <AppliedServiceProviders providers={service.PotentialProviders} service={service} session={session!} />
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

const AppliedServiceProviders = ({ providers, service, session }: { providers: Provider[], service: Service, session: string }) => {
    return (
        <>
            {providers.length > 0 && <section className='flex-1 flex flex-col justify-center items-center overflow-hidden overflow-y-scroll py-10 gap-10 scrollbar-hide'>
                <h2 className='font-bold text-3xl text-gray-600'>Applied Service Providers</h2>
                <hr className="border-1 w-44 border-gray-400" />
                {providers.map((provider, i) => (
                    <PotentialProvidersCard service={service} session={session!} provider={provider} key={i} />
                ))}
            </section>}</>
    )
}

const ServiceInfo = ({ service }: { service: Service }) => {
    const user = store.getState().user.user
    return (
        <section className='flex-1 lg:h-[50%] gap-5 flex flex-col justify-center items-center'>
            <div className='rounded-lg bg-white shadow-lg p-10 lg:h-[70%] xl:h-full h-[60%] w-full 2xl:w-[40%] xl:w-[50%] lg:w-[60%] md:w-[80%] flex flex-col justify-between items-start'>
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
                <ActionButtons user={user} service={service} />
                <Progress user={user} service={service} />
            </div>
        </section>
    )
}


export default OrderDetails