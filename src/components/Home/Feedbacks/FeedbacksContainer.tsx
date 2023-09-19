'use client'
import React from 'react'
import Carousel from 'react-multi-carousel'
import { FeedbackCards } from './FeedbackCards'
import { Feedback } from '@/lib/typings'
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
    }
}

interface PageProps {
    feedbacks: Feedback[]
}

const FeedbacksContainer = ({ feedbacks }: PageProps) => {
    return (
        <Carousel responsive={responsive} infinite arrows={false} autoPlay autoPlaySpeed={1000} centerMode>
            {feedbacks.map((feedback, i) => (
                <FeedbackCards key={i} feedback={feedback} />
            ))}
        </Carousel>
    )
}

export default FeedbacksContainer