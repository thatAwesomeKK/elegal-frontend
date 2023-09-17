'use client'
import { Button } from '@/components/ui/button'
import { completeService } from '@/lib/apiCalls/service'
import { useRouter } from 'next/navigation'
import React from 'react'

interface PageProps {
    accessToken: string
    serviceId: string
}

const CompletedButton = ({ accessToken, serviceId }: PageProps) => {
    const router = useRouter()
    const onSubmit = async () => {
        await completeService(accessToken, serviceId)
        router.refresh()
    }
    return (
        <Button onClick={onSubmit} className='w-40'>Complete</Button>
    )
}

export default CompletedButton