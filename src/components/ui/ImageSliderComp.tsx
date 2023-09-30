'use client'
import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

const images = ["https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"]

function ImageSliderComp() {
    return (
        <SimpleImageSlider
            width={"100%"}
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