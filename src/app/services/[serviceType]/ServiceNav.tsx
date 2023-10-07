import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import Link from 'next/link'

interface PageProps {
    children: React.ReactNode
    serviceType: string
}

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




const ServiceNav = ({ children, serviceType }: PageProps) => {
    return <section className='flex w-full justify-center items-center mt-[20px] md:mt-[80px] px-4 md:px-0'>
        <Tabs className='w-full sm:w-[580px] h-max rounded-lg'
            defaultValue={serviceType as string || "advocate"}>
            <TabsList className='h-min flex flex-wrap md:flex-nowrap'>
                {
                    services.map((service, index) => {
                        return <TabsTrigger key={index} value={service.value} className=' md:w-full'><Link href={`/services/${service.value}`} replace>{service.name}</Link></TabsTrigger>
                    })
                }
            </TabsList>
            {children}
        </Tabs>
    </section>
}

export default ServiceNav