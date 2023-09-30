import RatingForm from '@/components/Forms/RatingForm'
import React from 'react'

interface PageProps {
    searchParams: {
        legalProviderId: string
    }
}

const Rating = ({ searchParams: { legalProviderId } }: PageProps) => {
    return (
        <RatingForm serviceProviderId={legalProviderId} />
    )
}

export default Rating