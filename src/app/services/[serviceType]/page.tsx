import AdvocateForm from '@/components/Forms/AdvocateForm'
import ArbitratorForm from '@/components/Forms/ArbitratorForm'
import DocumentWriterForm from '@/components/Forms/DocumentWriterForm'
import MediatorForm from '@/components/Forms/MediatorForm'
import NotaryForm from '@/components/Forms/NotaryForm'
import { cookies } from 'next/headers'
import React from 'react'

interface PageProps {
    params: {
        serviceType: string
    }
}

const Services = async ({ params: { serviceType } }: PageProps) => {

    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if (serviceType === "advocate")
        return <main className='h-[93.5vh] flex justify-center items-center'>
            <AdvocateForm accessToken={accessToken} serviceType={serviceType}/>
        </main>
    if (serviceType === "notary")
        return <main className='h-[93.5vh] flex justify-center items-center'>
            <NotaryForm accessToken={accessToken} serviceType={serviceType}/>
        </main>
    if (serviceType === "document-writer")
        return <main className='h-[93.5vh] flex justify-center items-center'>
            <DocumentWriterForm accessToken={accessToken} serviceType={serviceType}/>
        </main>
    if (serviceType === "arbitrator")
        return <main className='h-[93.5vh] flex justify-center items-center'>
            <ArbitratorForm accessToken={accessToken} serviceType={serviceType}/>
        </main>
    if (serviceType === "mediator")
        return <main className='h-[93.5vh] flex justify-center items-center'>
            <MediatorForm accessToken={accessToken} serviceType={serviceType}/>
        </main>
}

export default Services
