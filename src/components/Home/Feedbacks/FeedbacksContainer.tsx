'use client'
import React from 'react'
import { FeedbackCards } from './FeedbackCards'
import { Feedback } from '@/lib/typings'

import Slider from "react-slick";

let settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
  arrows: false,
  responsive: [
    {
      breakpoint: 3001,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 1524,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

interface PageProps {
  feedbacks: Feedback[]
}

const FeedbacksContainer = ({ feedbacks }: PageProps) => {
  return (
    // @ts-ignore
    <Slider {...settings}>
      {feedbacks?.map((feedback, i) => (
        <FeedbackCards key={i} feedback={feedback} />
      ))}
    </Slider>
  )
}

export default FeedbacksContainer