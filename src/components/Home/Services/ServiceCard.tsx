import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface PageProps {
    image: string
    type: string
    url?: string
}

export const ServiceCard = ({ image, type, url }: PageProps) => {
    return (
        <Card className='hover:shadow-lg hover:shadow-slate-400'>
            <Link href={url || '/'} prefetch={false}>
                <CardContent className='h-[200px] p-0 cursor-pointer w-full relative border-[0.5px] border-gray-300'>

                    <Image className='object-cover' src={image} alt={type} fill />

                </CardContent>
                <CardFooter className='px-5 pt-3 pb-3'>
                    <div className='flex h-full w-full items-center justify-between'>
                        <h2 className='capitalize text-[16px] whitespace-nowrap'>{type}</h2>
                        <Button variant={"outline"} className='whitespace-nowrap'>
                            Apply For Service
                        </Button>
                    </div>
                </CardFooter>
            </Link>
        </Card>
    )
}
