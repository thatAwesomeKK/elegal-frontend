import { fetchMatchServiceRequest } from '@/lib/apiCalls/service'
import { cookies } from 'next/headers'
import React from 'react'
import ServiceCard from '../AvailableServices/ServiceCard'
import { Service } from '@/lib/typings'
import { Libre_Baskerville } from 'next/font/google'

const libreBaskerville = Libre_Baskerville({ subsets: ['latin', 'latin-ext'], weight: ['400'], preload: true })

const BestMatchServices = async () => {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    const services: Service[] = await fetchMatchServiceRequest(accessToken)

    return (
        <section className='my-10 mx-20'>
            <h1 className={`${libreBaskerville.className} text-gray-600 text-8xl font-bold text-center mb-16`}>Best Matches</h1>
            {services.length > 0 ? <div className='grid grid-cols-4 gap-10'>
                {services.map((service, i: number) => (
                    <ServiceCard key={i} service={service} />
                ))}
            </div> : <p className='text-center font-medium text-lg text-red-500'>No Best Matching Services Found!</p>}
        </section >
    )
}

export default BestMatchServices