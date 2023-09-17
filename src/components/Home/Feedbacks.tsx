'use client'
import React from 'react'
import { FeedbackCards } from './Feedbacks/FeedbackCards'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { Permanent_Marker } from 'next/font/google';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: '400' })

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

export const Feedbacks = () => {
    return (
        <section className='my-10 mx-10'>
            <h1 className={`${permanentMarker.className} text-gray-600 text-8xl font-bold text-center mb-16 underline`}>Feedback/Stories</h1>
            <Carousel responsive={responsive} infinite arrows={false} autoPlay autoPlaySpeed={1000} centerMode> 
                <FeedbackCards />
                <FeedbackCards />
                <FeedbackCards />
                <FeedbackCards />
                <FeedbackCards />
                <FeedbackCards />
                <FeedbackCards />
                <FeedbackCards />
                <FeedbackCards />
                <FeedbackCards />
            </Carousel>
        </section>
    )
}
