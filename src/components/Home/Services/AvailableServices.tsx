import { fetchAvailableServiceRequest } from '@/lib/apiCalls/service';
import { cookies } from 'next/headers';
import React from 'react'
import ServiceCard from '../AvailableServices/ServiceCard';
import { Service } from '@/lib/typings';
import { Libre_Baskerville } from 'next/font/google'

const libreBaskerville = Libre_Baskerville({ subsets: ['latin', 'latin-ext'], weight: ['400'], preload: true })

const AvailableServices = async () => {
    const cookieStore = cookies()
    const session = cookieStore.get('sid')?.value
    const services: Service[] = await fetchAvailableServiceRequest(session)

    return (
        <section className='my-10 mx-20'>
            <h1 className={`${libreBaskerville.className} text-[2rem] sm:text-[4rem] text-gray-600 lg:text-8xl font-bold text-center mb-16`}>Available Services</h1>
            {services.length > 0 ? <div className='
            grid grid-cols-1 w-full max-w-[50rem] gap-10 
            sm:grid-cols-2 sm:max-w-[70rem] 
            md:grid-cols-2 md:max-w-[100rem] 
            lg:grid-cols-3 lg:gap-15 
            xl:grid-cols-4 xl:gap-20 
            2xl:max-w-none 3xl:grid-cols-5'>
                {services.map((service, i: number) => (
                    <ServiceCard key={i} service={service} />
                ))}
            </div> : <p className='text-center font-medium text-lg text-red-500'>No Available Services Found!</p>}
        </section>
    )
}

export default AvailableServices