import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import Link from 'next/link'

const services = [
    {
        name: 'Advocate',
        value: 'advocate',
    },
    {
        name: 'Notary',
        value: 'notary',
    },
    {
        name: 'Document Writer',
        value: 'document-writer',
    },
    {
        name: 'Arbitrator',
        value: 'arbitrator',
    },
    {
        name: 'Mediator',
        value: 'mediator',
    }
]


const ServiceNav = () => {
    return <TabsList className='h-min flex flex-wrap md:flex-nowrap'>
        {
            services.map((service, index) => {
                return <TabsTrigger key={index} value={service.value} className=' md:w-full'><Link href={`/services/${service.value}`} replace>{service.name}</Link></TabsTrigger>
            })
        }
    </TabsList>
}

export default ServiceNav