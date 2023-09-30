import dynamic from 'next/dynamic'
import React from 'react'
import ImageSliderLoader from './ImageSliderLoader'
const ImageSliderComp = dynamic(() => import('../ui/ImageSliderComp'), { ssr: true, loading: () => <ImageSliderLoader /> })

export const ImageSlider = () => {
    return (
        <ImageSliderComp />
    )
}
