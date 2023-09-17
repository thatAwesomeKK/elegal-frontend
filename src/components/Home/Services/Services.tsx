import React from 'react'
import { Permanent_Marker } from 'next/font/google'
import { ServiceCard } from './ServiceCard'

const permanentMarker = Permanent_Marker({ subsets: ['latin'] , weight: '400'})


export const Services = () => {
    return (
        <section className=' max-w-6xl mx-auto my-16'>
            <h1 className={`${permanentMarker.className} text-gray-600 text-8xl font-bold text-center mb-16 underline`}>Services</h1>
            <div className='grid grid-cols-3 gap-20'>
                <ServiceCard image='/assets/advocate.png' type='advocate' url="/services/advocate"/>
                <ServiceCard image='/assets/stamp_paper.jpg' type='notary' url="/services/notary"/>
                <ServiceCard image='/assets/arbitrator.jpg' type='arbitrator' url="/services/arbitrator"/>
                <ServiceCard image='/assets/mediator.jpg' type='mediator' url="/services/mediator"/>
                <ServiceCard image='/assets/document_writers.jpg' type='document writer' url="/services/document-writer"/>
            </div>
        </section>
    )
}
