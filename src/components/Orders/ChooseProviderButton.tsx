'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { assignServiceProvider } from '@/lib/apiCalls/service'
import { Provider, Service } from '@/lib/typings'
import { useRouter } from 'next/navigation'

interface PageProps {
    accessToken: string
    service: Service
    provider: Provider
}

const ChooseProviderButton = ({ accessToken, service, provider }: PageProps) => {
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const onSubmit = async () => {
        setLoading(true)
        await assignServiceProvider(accessToken, service._id, provider.uid?._id as string, provider.price)
        router.refresh()
        setLoading(false)
    }
    return (
        <Button disabled={loading} onClick={onSubmit} className='bg-blue-500 py-3 px-4 rounded-xl w-full text-center'>Choose</Button >
    )
}

export default ChooseProviderButton