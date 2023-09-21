
import ServiceCard from '../AvailableServices/ServiceCard'
import { Libre_Baskerville } from 'next/font/google'

const libreBaskerville = Libre_Baskerville({ subsets: ['latin', 'latin-ext'], weight: ['400'], preload: true })

import { Service } from '@/lib/typings'

const BestMatchServices = async ({ services }: {
    services: Service[]
}) => {

    return (
        <section className='my-10 mx-20'>
            <h1 className={`${libreBaskerville.className} text-gray-600 text-8xl font-bold text-center mb-16`}>Best Matches</h1>
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