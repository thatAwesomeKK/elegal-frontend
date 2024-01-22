'use client'
import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

const images = ["https://res.cloudinary.com/storageforweb/image/upload/v1705934743/tingey-injury-law-firm-6sl88x150Xs-unsplash_xfqpvo.jpg", "https://res.cloudinary.com/storageforweb/image/upload/v1705934819/scott-graham-OQMZwNd3ThU-unsplash_sj9hau.jpg","https://res.cloudinary.com/storageforweb/image/upload/v1705934861/tim-gouw-bwki71ap-y8-unsplash_gsuxqp.jpg","https://res.cloudinary.com/storageforweb/image/upload/v1705934901/melinda-gimpel-xcVW_sFp4jQ-unsplash_pfpc9m.jpg"]

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
