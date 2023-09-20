import FeedbackForm from '@/components/Forms/FeedbackForm'
import { cookies } from 'next/headers'
import React from 'react'

interface PageProps {
    searchParams: {
        orderId: string
    }
}

const Feedback = ({ searchParams: { orderId } }: PageProps) => {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    return (
        <main className='h-[93.5vh] flex justify-center items-center'>
            <FeedbackForm accessToken={accessToken!} orderId={orderId}/>
        </main>
    )
}

export default Feedback