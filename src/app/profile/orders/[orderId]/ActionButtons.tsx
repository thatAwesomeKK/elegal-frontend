import { Service, User } from '@/lib/typings'
import React from 'react'
import PaymentButton from './PaymentButton'
import CompletedButton from './CompletedButton'
import ReceivedButton from './ReceivedButton'

interface PageProps {
    user: User
    accessToken: string
    service: Service
}

const ActionButtons = ({ user, accessToken, service }: PageProps) => {
    return (
        <>
            {(user?.role === 'buyer' && service.life === 'assigned') && <PaymentButton accessToken={accessToken!} service={service} />}
            {(user?.role === 'service-provider' && service.life === 'paid') && <CompletedButton accessToken={accessToken!} serviceId={service._id} />}
            {(user?.role === 'buyer' && service.life === 'completed') && <ReceivedButton accessToken={accessToken!} serviceId={service._id} />}
        </>
    )
}

export default ActionButtons