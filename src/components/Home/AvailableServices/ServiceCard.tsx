import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Service } from '@/lib/typings';
import Link from 'next/link';
import React from 'react'

interface PageProps {
    service: Service
}

const ServiceCard = ({ service }: PageProps) => {
    return (
        <>
            <Card className="w-80 h-72 rounded-xl border-2 border-gray-300 flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className='capitalize font-bold'>{service.type}</CardTitle>
                    <p className='capitalize'><span className='font-medium'>Case Type:</span> {service.caseType}</p>
                </CardHeader>
                <CardContent>
                    <h3 className='font-bold text-lg'>Description:</h3>
                    <p className='font-medium text-gray-600'>{service.description}</p>
                </CardContent>
                <CardFooter>
                    <Link href={`/service/${service._id}`} className='active:scale-105'>More Details</Link>
                </CardFooter>
            </Card>
        </>
    )
}

export default ServiceCard