import { cookies } from 'next/headers'
import React from 'react'
import {
    TabsContent
} from "@/components/ui/tabs";
import dynamic from 'next/dynamic';
const ServicesForm = dynamic(() => import('@/components/Forms/ServicesForm'), { ssr: false, loading: () => <p>Loading....</p> })


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

const Services = async () => {
    const cookieStore = cookies()
    const session = cookieStore.get('sid')?.value

    return (
        <>
            {
                services.map((service, index) => {
                    return <TabsContent key={index} value={service.value}>
                        <ServicesForm session={session} serviceType={service.value} />
                    </TabsContent>
                })
            }

        </>
    )


}

export default Services
