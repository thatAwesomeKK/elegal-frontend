import { fetchServiceWithId } from '@/lib/apiCalls/service'
import { Service } from '@/lib/typings'
import { cookies } from 'next/headers'
import React from 'react'
import ActionButtons from './ActionButtons'

interface PageProps {
    params: {
        serviceId: string
    }
}

const ServiceDetail = async ({ params: { serviceId } }: PageProps) => {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    const service: Service = await fetchServiceWithId(accessToken, serviceId)

    return (
        <main className='max-w-7xl mx-auto flex flex-col justify-center items-center h-[93.5vh]'>
            <section className='bg-white shadow-lg p-10 h-[50%] w-[50%] flex flex-col justify-between items-start'>
                <div>
                    <h2 className='text-3xl font-bold capitalize'>{service.type}({service.caseType})</h2>
                    <p><span className='font-medium text-lg'>Location: </span> {service.city}, {service.state}</p>
                </div>
                <div className='flex flex-col items-start flex-1 my-6'>
                    <h4 className='text-xl font-semibold'>Description:</h4>
                    <p>{service.description}</p>
                </div>
                <ActionButtons serviceId={service._id} accessToken={accessToken!} price={service.price}/>
            </section>
        </main>
    )
}

export default ServiceDetail