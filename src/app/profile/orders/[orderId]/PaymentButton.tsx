'use client'
import { Button } from '@/components/ui/button'
import { payForService } from '@/lib/apiCalls/service'
import { Service } from '@/lib/typings'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface PageProps {
    service: Service
}

const PaymentButton = ({ service }: PageProps) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const onSubmit = async () => {
        setLoading(true)
        await payForService(service._id)
        router.refresh()
        setLoading(false)
    }
    return (
        <Button onClick={onSubmit} className='w-36' disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Paying...</> : <>Pay ₹{service.price}</>}
        </Button>
    )
}

export default PaymentButton