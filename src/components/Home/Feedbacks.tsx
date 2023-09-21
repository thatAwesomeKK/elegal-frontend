import React, { Suspense } from 'react'
import { getFeedbacks } from '@/lib/apiCalls/feedback';
import { Feedback } from '@/lib/typings';
import FeedbacksContainer from './Feedbacks/FeedbacksContainer';
import FeedbackSkeleton from './Feedbacks/FeedbackSkeleton';
import { Libre_Baskerville } from 'next/font/google'

const libreBaskerville = Libre_Baskerville({ subsets: ['latin', 'latin-ext'], weight: ['400'], preload: true })

export const Feedbacks = async () => {
    return (
        <section className='my-10 mx-0 sm:mx-10'>
            <h1 className={`${libreBaskerville.className} text-[2rem] sm:text-[4rem] text-gray-600 lg:text-8xl font-bold text-center mb-16`}>Feedback/Stories</h1>
            <Suspense fallback={<FeedbackSkeleton />}>
                <FetchFeedback />
            </Suspense>
        </section>
    )
}

const FetchFeedback = async () => {
    const feedbacks: Feedback[] = await getFeedbacks()
    return <FeedbacksContainer feedbacks={feedbacks} />
}
