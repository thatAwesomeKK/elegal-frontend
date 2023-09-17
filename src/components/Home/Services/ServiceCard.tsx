import { Lilita_One } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const lilitaOne = Lilita_One({ subsets: ['latin'], weight: '400' })

interface PageProps {
    image: string
    type: string
    url?: string
}

export const ServiceCard = ({ image, type, url }: PageProps) => {
    return (
        <Link href={url || '/'} className='relative h-72 w-72 flex justify-center items-center group transition-transform duration-100 ease-in-out hover:scale-105 cursor-pointer shadow-lg rounded-full overflow-hidden border bottom-2 border-gray-300'>
            <div className='absolute h-72 w-72 group-hover:opacity-30 transition-transform duration-100 ease-in-out'>
                <div className='bg-white relative h-full w-full'>
                    <Image className='object-cover' src={image} alt='' fill />
                </div>
            </div>
            <h2 className={`${lilitaOne.className} group-hover:z-10 text-red-700 font-semibold text-4xl capitalize absolute transition-transform duration-100 ease-in-out opacity-0 group-hover:opacity-100`}>{type}</h2>
        </Link>
    )
}
