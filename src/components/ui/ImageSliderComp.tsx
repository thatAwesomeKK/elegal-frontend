'use client'
import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

interface PageProps {
    images: Array<string>
}

function ImageSliderComp({ images }: PageProps) {
    return (
        <SimpleImageSlider
            width={"99.1vw"}
            height={"70vh"}
            images={images}
            showBullets={false}
            showNavs={false}
            autoPlay={true}
            slideDuration={2}
        />
    )
}

export default ImageSliderComp