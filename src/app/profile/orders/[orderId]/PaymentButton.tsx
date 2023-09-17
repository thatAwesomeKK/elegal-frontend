'use client'
import { Button } from '@/components/ui/button'
import { payForService } from '@/lib/apiCalls/service'
import { Service } from '@/lib/typings'
import React from 'react'
import { useRouter } from 'next/navigation'

interface PageProps {
    accessToken: string
    service: Service
}

const PaymentButton = ({ accessToken, service }: PageProps) => {
    const router = useRouter()
    const onSubmit = async () => {
        await payForService(accessToken, service._id)
        router.refresh()
    }
    return (
        <Button onClick={onSubmit} className='w-40'>Pay ₹{service.price}</Button>
    )
}

export default PaymentButton