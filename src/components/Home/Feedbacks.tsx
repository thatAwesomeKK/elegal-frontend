import React from 'react'
import { getFeedbacks } from '@/lib/apiCalls/feedback';
import { Feedback } from '@/lib/typings';
import FeedbacksContainer from './Feedbacks/FeedbacksContainer';
import { Libre_Baskerville } from 'next/font/google'

const libreBaskerville = Libre_Baskerville({ subsets: ['latin', 'latin-ext'], weight: ['400'], preload: true })

export const Feedbacks = async () => {
    const feedbacks: Feedback[] = await getFeedbacks()

    return (
        <section className='my-10 mx-10'>
            <h1 className={`${libreBaskerville.className} text-gray-600 text-8xl font-bold text-center mb-16`}>Feedback/Stories</h1>
            <FeedbacksContainer feedbacks={feedbacks} />
        </section>
    )
}
