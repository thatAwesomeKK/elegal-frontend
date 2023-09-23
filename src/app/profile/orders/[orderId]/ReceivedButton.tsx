'use client'
import { Button } from '@/components/ui/button'
import { receivedService } from '@/lib/apiCalls/service'
import { useRouter } from 'next/navigation'
import React from 'react'

interface PageProps {
    serviceId: string
}

const ReceivedButton = ({ serviceId }: PageProps) => {
    const router = useRouter()
    const onSubmit = async () => {
        await receivedService(serviceId)
        router.refresh()
    }
    return (
        <Button onClick={onSubmit} className='w-40'>Recieved</Button>
    )
}

export default ReceivedButton