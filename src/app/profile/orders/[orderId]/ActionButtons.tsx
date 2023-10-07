'use client'
import { Service, User } from '@/lib/typings'
import React from 'react'
import PaymentButton from './PaymentButton'
import CompletedButton from './CompletedButton'
import ReceivedButton from './ReceivedButton'
import { useAppSelector } from '@/lib/redux/store'

interface PageProps {
    service: Service
}

const ActionButtons = ({ service }: PageProps) => {
    const user: User = useAppSelector(store => store.user.user)
    return (
        <>
            {(user?.role === 'buyer' && service.life === 'assigned') && <PaymentButton service={service} />}
            {(user?.role === 'service-provider' && service.life === 'paid') && <CompletedButton serviceId={service._id} />}
            {(user?.role === 'buyer' && service.life === 'completed') && <ReceivedButton serviceId={service._id} />}
        </>
    )
}

export default ActionButtons