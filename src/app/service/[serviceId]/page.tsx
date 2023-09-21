import { fetchServiceWithId } from '@/lib/apiCalls/service'
import { Service } from '@/lib/typings'
import { cookies } from 'next/headers'
import React from 'react'
import ActionButtons from './ActionButtons'
import PotentialProvidersCard from '@/components/Orders/PotentialProvidersCard'
import { store } from '@/lib/redux/store'

interface PageProps {
    params: {
        serviceId: string
    }
}

const ServiceDetail = async ({ params: { serviceId } }: PageProps) => {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    const service: Service = await fetchServiceWithId(accessToken, serviceId)

    const user = store.getState().user.user

    const checkExists = () => {
        const served = service.PotentialProviders.filter(provider => provider.uid?._id === user?._id)
        return (served.length > 0 ? true : false)
    } 

    return (
        <main className='max-w-7xl mx-auto flex justify-center items-center h-[93.5vh]'>
            <section className='flex-1 flex flex-col justify-center items-center min-h-full overflow-hidden overflow-y-scroll py-10 gap-10 scrollbar-hide'>
                <h2 className='font-bold text-3xl text-gray-600'>Applied Service Providers</h2>
                <hr className="border-1 w-44 border-gray-400" />
                <>
                    {service.PotentialProviders?.length > 0 ? service.PotentialProviders.map((provider, i) => (
                        <PotentialProvidersCard service={service} provider={provider} key={i} />
                    )) : "No one Applied Yet!"
                    }
                </>
            </section>
            <section className='flex-1 bg-white shadow-lg p-10 h-[50%] w-[50%] flex flex-col justify-between items-start'>
                <div>
                    <h2 className='text-3xl font-bold capitalize'>{service.type}({service.caseType})</h2>
                    <p><span className='font-medium text-lg'>Location: </span> {service.city}, {service.state}</p>
                </div>
                <div className='flex flex-col items-start flex-1 my-6'>
                    <h4 className='text-xl font-semibold'>Description:</h4>
                    <p>{service.description}</p>
                </div>
                {!checkExists() && <ActionButtons serviceId={service._id} accessToken={accessToken!} price={service.price} />}
            </section>
        </main>
    )   
}

export default ServiceDetail