import { cookies } from 'next/headers'
import React from 'react'
import ServicesForm from '@/components/Forms/ServicesForm'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/ui/tabs";
import Link from 'next/link'
interface PageProps {
    params: {
        serviceType: string
    }
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

const Services = async ({ params: { serviceType } }: PageProps) => {
    console.log(serviceType);

    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    return (
        <section className='flex w-full justify-center items-center mt-[20px] md:mt-[80px]' >
            <Tabs
                className='w-full sm:w-[580px] h-max rounded-lg'
                defaultValue={serviceType as string || "advocate"}>
                <TabsList className='w-full flex flex-nowrap'>
                    {
                        services.map((service, index) => {
                            return <TabsTrigger key={index} value={service.value} className='w-full'><Link href={`/services/${service.value}`} replace>{service.name}</Link></TabsTrigger>
                        })
                    }
                </TabsList>
                {
                    services.map((service, index) => {
                        return <TabsContent key={index} value={service.value}>
                            <ServicesForm accessToken={accessToken} serviceType={service.value} />
                        </TabsContent>
                    })
                }
            </Tabs>
        </section>
    )


}

export default Services
