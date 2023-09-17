import { fetchMatchServiceRequest } from '@/lib/apiCalls/service'
import { cookies } from 'next/headers'
import React from 'react'
import { Permanent_Marker } from 'next/font/google'
import ServiceCard from '../AvailableServices/ServiceCard'
import { Service } from '@/lib/typings'

const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: '400' })

const BestMatchServices = async () => {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    const services: Service[] = await fetchMatchServiceRequest(accessToken)
    return (
        <section className='my-10 mx-20'>
            <h1 className={`${permanentMarker.className} text-gray-600 text-8xl font-bold text-center mb-16 underline`}>Best Matches</h1>
            <div className='grid grid-cols-4 gap-10'>
                {
                    services?.map((service, i: number) => (
                        <ServiceCard key={i} service={service} />
                    ))
                }
            </div>
        </section>
    )
}

export default BestMatchServices