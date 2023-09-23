import React from 'react'
import { ServiceCard } from './ServiceCard'
import { Libre_Baskerville } from 'next/font/google'
import { services } from '@/lib/utils'

const libreBaskerville = Libre_Baskerville({ subsets: ['latin', 'latin-ext'], weight: ['400'], preload: true })


export const Services = () => {
    return (
        <section className=' max-w-6xl 2xl:max-w-none mx-auto my-16 px-5'>
            <h1 className={`${libreBaskerville.className} text-gray-600 text-[50px] md:text-8xl font-bold text-center mb-3 md:mb-16`}>Services</h1>
            <div className='
            grid grid-cols-1 w-full max-w-[50rem] gap-10 
            sm:grid-cols-2 sm:max-w-[70rem] 
            md:grid-cols-2 md:max-w-[100rem] 
            lg:grid-cols-3 lg:gap-15 
            xl:grid-cols-4 xl:gap-20 
            2xl:max-w-none 3xl:grid-cols-5'>
                {
                    services.map((service, index) => {
                        return (
                            <ServiceCard key={index} image={service.image} type={service.type} url={service.url} />
                        )
                    })
                }
            </div>
        </section>
    )
}
