import Image from 'next/image'
import React from 'react'

const ImageSliderLoader = () => {
    return (
        <div className='relative h-[70vh] w-full'>
            <Image className='object-top object-cover' src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" fill />
        </div>
    )
}

export default ImageSliderLoader