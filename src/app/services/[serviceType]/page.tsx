import AdvocateForm from '@/components/Forms/AdvocateForm'
import ArbitratorForm from '@/components/Forms/ArbitratorForm'
import DocumentWriterForm from '@/components/Forms/DocumentWriterForm'
import MediatorForm from '@/components/Forms/MediatorForm'
import NotaryForm from '@/components/Forms/NotaryForm'
import { cookies } from 'next/headers'
import React from 'react'
import ServicesForm from '@/components/Forms/ServicesForm'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/ui/tabs";
interface PageProps {
    params: {
        serviceType: string
    }
}

const services = [
    {
        name: 'Advocate',
        value: 'advocate'
    },
    {
        name: 'Notary',
        value: 'notary'
    },
    {
        name: 'Document Writer',
        value: 'document-writer'
    },
    {
        name: 'Arbitrator',
        value: 'arbitrator'
    },
    {
        name: 'Mediator',
        value: 'mediator'
    }
]

const Services = async ({ params: { serviceType } }: PageProps) => {

    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    // if (serviceType === "advocate")
    //     return <main className='h-[93.5vh] flex justify-center items-center'>
    //         <AdvocateForm accessToken={accessToken} serviceType={serviceType}/>
    //     </main>
    // if (serviceType === "notary")
    //     return <main className='h-[93.5vh] flex justify-center items-center'>
    //         <NotaryForm accessToken={accessToken} serviceType={serviceType}/>
    //     </main>
    // if (serviceType === "document-writer")
    //     return <main className='h-[93.5vh] flex justify-center items-center'>
    //         <DocumentWriterForm accessToken={accessToken} serviceType={serviceType}/>
    //     </main>
    // if (serviceType === "arbitrator")
    //     return <main className='h-[93.5vh] flex justify-center items-center'>
    //         <ArbitratorForm accessToken={accessToken} serviceType={serviceType}/>
    //     </main>
    // if (serviceType === "mediator")
    //     return <main className='h-[93.5vh] flex justify-center items-center'>
    //         <MediatorForm accessToken={accessToken} serviceType={serviceType}/>
    //     </main>

    // switch (serviceType) {
    //     case 'advocate':
    //         return <main className='h-[93.5vh] flex justify-center items-center'>
    //             <AdvocateForm accessToken={accessToken} serviceType={serviceType} />
    //         </main>
    //     case 'notary':
    //         return <main className='h-[93.5vh] flex justify-center items-center'>
    //             <NotaryForm accessToken={accessToken} serviceType={serviceType} />
    //         </main>
    //     case 'document-writer':
    //         return <main className='h-[93.5vh] flex justify-center items-center'>
    //             <DocumentWriterForm accessToken={accessToken} serviceType={serviceType} />
    //         </main>
    //     case 'arbitrator':
    //         return <main className='h-[93.5vh] flex justify-center items-center'>
    //             <ArbitratorForm accessToken={accessToken} serviceType={serviceType} />
    //         </main>
    //     case 'mediator':
    //         return <main className='h-[93.5vh] flex justify-center items-center'>
    //             <MediatorForm accessToken={accessToken} serviceType={serviceType} />
    //         </main>
    //     default:
    //         return <main className='h-[93.5vh] flex justify-center items-center'>
    //             <h1 className='text-4xl font-bold text-center'>404 Not Found</h1>
    //         </main>
    // }
    return (

        <section className='flex w-full justify-center items-center mt-[20px] md:mt-[80px]' >
            <Tabs
                className='w-full sm:w-[580px] h-max rounded-lg'
                defaultValue={serviceType as string || "advocate"}>
                <TabsList className='w-full flex flex-nowrap'>
                    {
                        services.map((service, index) => {
                            return <TabsTrigger key={index} value={service.value} className='w-full'>{service.name}</TabsTrigger>
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
