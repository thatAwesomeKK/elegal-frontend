import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { fetchServiceWithId } from '@/lib/apiCalls/service'
import { Service } from '@/lib/typings'
import { cookies } from 'next/headers'
import React from 'react'
import PaymentButton from './PaymentButton'
import CompletedButton from './CompletedButton'
import { store } from '@/lib/redux/store'

interface PageProps {
    params: {
        orderId: string
    }
}

const OrderDetails = async ({ params: { orderId } }: PageProps) => {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    const service: Service = await fetchServiceWithId(accessToken, orderId)
    const user = store.getState().user.user

    const checkLife = (stage: string) => {
        if (service.life === 'created' && stage === 'created')
            return true

        if (service.life === 'assigned' && (stage === 'assigned' || stage === 'created'))
            return true

        if (service.life === 'paid' && (stage === 'paid' || stage === 'assigned' || stage === 'created'))
            return true

        if (service.life === 'completed' && (stage === 'completed' || stage === 'paid' || stage === 'assigned' || stage === 'created'))
            return true

        if (service.life === 'delivered' && (stage === 'delivered' || stage === 'completed' || stage === 'paid' || stage === 'assigned' || stage === 'created'))
            return true
        return false
    }

    return (
        <main className='max-w-7xl mx-auto flex flex-col justify-center items-center h-[93.5vh]'>
            <section className='bg-white shadow-lg p-10 h-[50%] w-[50%] flex flex-col justify-between items-start'>
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
                {(user?.role === 'buyer' && service.life === 'assigned') && <PaymentButton accessToken={accessToken!} service={service} />}
                {(user?.role === 'service-provider' && service.life === 'paid') && <CompletedButton accessToken={accessToken!} serviceId={service._id} />}
                {!checkLife('delivered') ? <ul className="steps w-full">
                    <li className={`step ${checkLife("created") && "step-primary"}`}>Created</li>
                    <li className={`step ${checkLife("assigned") && "step-primary"}`}>Service Provider Assigned</li>
                    <li className={`step ${checkLife("paid") && "step-primary"}`}>Paid</li>
                    <li className={`step ${checkLife("completed") && "step-primary"}`}>Completed</li>
                    <li className={`step ${checkLife("delivered") && "step-primary"}`}>Delivered</li>
                </ul> : <ul className="steps w-full">
                    <li className='step step-success'>Created</li>
                    <li className='step step-success'>Service Provider Assigned</li>
                    <li className='step step-success'>Paid</li>
                    <li className='step step-success'>Completed</li>
                    <li className='step step-success'>Delivered</li>
                </ul>}
            </section>
        </main>
    )
}

export default OrderDetails