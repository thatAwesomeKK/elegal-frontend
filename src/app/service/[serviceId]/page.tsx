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
    const session = cookieStore.get('sid')?.value

    const service: Service = await fetchServiceWithId(session!, serviceId)  
    const user = store.getState().user.user

    const checkExists = () => {
        const served = service.PotentialProviders.filter(provider => provider.uid?._id === user?._id)
        return (served.length > 0 ? true : false)
    }

    if (!service) {
        return <main className='max-w-7xl mx-auto flex justify-center items-center h-[93.5vh]'>
            Not Found!
        </main>
    }

    return (
        <main className='flex justify-between flex-col lg:flex-row items-center py-5 px-8 w-full'>
            <section className='w-full lg:max-w-[25rem] bg-white shadow-lg p-10 gap-5 flex flex-col justify-between items-center'>
                <div className='flex flex-wrap lg:flex-col items-center justify-center gap-8'>
                    <div className='flex flex-col items-start justify-center'>
                        <h2 className='text-3xl font-bold capitalize'>{service.type}({service.caseType})</h2>
                        <p><span className='font-medium text-lg'>Location: </span> {service.city}, {service.state}</p>
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                        <h4 className='text-xl font-semibold'>Description:</h4>
                        <p>{service.description}</p>
                    </div>
                </div>
                {!checkExists() && <ActionButtons serviceId={service._id} price={service.price} />}
            </section>
            <section className='w-full h-full py-5'>
                <div className=' flex flex-col justify-start items-center min-h-full overflow-hidden overflow-y-scroll  gap-10 scrollbar-hide'>
                    <h2 className='font-bold text-3xl text-gray-600 flex items-center justify-center gap-3 flex-col'>
                        Applied Service Providers
                        <hr className="border-1 w-44 border-gray-400" />
                    </h2>

                    <div className="flex flex-wrap gap-5">
                        {service.PotentialProviders?.length > 0 ? service.PotentialProviders.map((provider, i) => (
                            <PotentialProvidersCard service={service} provider={provider} key={i} />
                        )) : "No one Applied Yet!"
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ServiceDetail