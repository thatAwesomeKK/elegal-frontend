import React from 'react'
import { Permanent_Marker } from 'next/font/google';
import { getFeedbacks } from '@/lib/apiCalls/feedback';
import { Feedback } from '@/lib/typings';
import FeedbacksContainer from './Feedbacks/FeedbacksContainer';

const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: '400', preload: true })

export const Feedbacks = async () => {
    const feedbacks: Feedback[] = await getFeedbacks()

    return (
        <section className='my-10 mx-10'>
            <h1 className={`${permanentMarker.className} text-gray-600 text-8xl font-bold text-center mb-16 underline`}>Feedback/Stories</h1>
            <FeedbacksContainer feedbacks={feedbacks} />
        </section>
    )
}
