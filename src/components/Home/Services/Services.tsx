import React from 'react'
import { Permanent_Marker } from 'next/font/google'
import { ServiceCard } from './ServiceCard'

const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: '400' })


export const Services = () => {

    const services = [{
        type: 'advocate',
        image: '/assets/advocate.png',
        url: '/services/advocate'
    }, {
        type: 'notary',
        image: '/assets/stamp_paper.jpg',
        url: '/services/notary'
    }, {
        type: 'arbitrator',
        image: '/assets/arbitrator.jpg',
        url: '/services/arbitrator'
    }, {
        type: 'mediator',
        image: '/assets/mediator.jpg',
        url: '/services/mediator'
    }, {
        type: 'document writer',
        image: '/assets/document_writers.jpg',
        url: '/services/document-writer'
    }]


    return (
        <section className=' max-w-6xl mx-auto my-16'>
            <h1 className={`${permanentMarker.className} text-gray-600 text-8xl font-bold text-center mb-16 underline`}>Services</h1>
            <div className='grid grid-cols-3 gap-20'>
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
