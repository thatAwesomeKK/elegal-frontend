'use client'
import { Button } from '@/components/ui/button'
import { receivedService } from '@/lib/apiCalls/service'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface PageProps {
    serviceId: string
}

const ReceivedButton = ({ serviceId }: PageProps) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const onSubmit = async () => {
        setLoading(true)
        await receivedService(serviceId)
        setLoading(false)
        router.refresh()
    }
    return (
        <Button onClick={onSubmit} className='w-36' disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Recieving...</> : <>Recieved</>}
        </Button>
    )
}

export default ReceivedButton