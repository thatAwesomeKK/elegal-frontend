'use client'
import { Service, User } from '@/lib/typings'
import React from 'react'
import PaymentButton from './PaymentButton'
import CompletedButton from './CompletedButton'
import ReceivedButton from './ReceivedButton'

interface PageProps {
    user: User
    service: Service
}

const ActionButtons = ({ user, service }: PageProps) => {
    return (
        <>
            {(user?.role === 'buyer' && service.life === 'assigned') && <PaymentButton service={service} />}
            {(user?.role === 'service-provider' && service.life === 'paid') && <CompletedButton serviceId={service._id} />}
            {(user?.role === 'buyer' && service.life === 'completed') && <ReceivedButton serviceId={service._id} />}
        </>
    )
}

export default ActionButtons