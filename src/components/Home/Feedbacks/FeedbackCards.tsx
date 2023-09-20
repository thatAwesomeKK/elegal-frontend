import { Feedback } from '@/lib/typings'
import Image from 'next/image'
import React from 'react'

interface PageProps {
    feedback: Feedback
}

export const FeedbackCards = ({ feedback }: PageProps) => {
    return (
        <div className='h-60 w-96 bg-white rounded-3xl shadow-lg border-4 border-blue-200 px-6 py-5 flex flex-col justify-evenly gap-5 items-center'>
            <div className='flex items-center space-x-2 justify-start w-full'>
                <Image className='rounded-full border border-black' src={feedback.uid?.pfp!} alt='' width={50} height={50} />
                <div>
                    <h4 className='font-semibold'>{feedback.uid?.username}</h4>
                    <h6 className='capitalize text-sm text-gray-500'>({feedback.uid?.role === 'service-provider' ? feedback.uid?.type : "Buyer"})</h6>
                </div>
            </div>
            <div className='bg-green-200 flex-1 shadow-lg rounded-lg w-full line-clamp-4'>
                <p className='p-5'>{feedback.description}</p>
            </div>
        </div>
    )
}
