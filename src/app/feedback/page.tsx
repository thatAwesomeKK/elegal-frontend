import FeedbackForm from '@/components/Forms/FeedbackForm'
import React from 'react'

interface PageProps {
    searchParams: {
        orderId: string
    }
}

const Feedback = ({ searchParams: { orderId } }: PageProps) => {
    return (
        <main className='h-[93.5vh] flex justify-center items-center'>
            <FeedbackForm orderId={orderId}/>
        </main>
    )
}

export default Feedback