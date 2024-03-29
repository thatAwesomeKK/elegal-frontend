import CloseModal from '@/components/ContactUs/CloseModal'
import ContactUsForm from '@/components/Forms/ContactUsForm'
import React from 'react'

const ContactModal = () => {
    return (
        <div className='fixed inset-0 bg-zinc-900/20 z-50'>
            <div className='container flex items-center h-full max-w-2xl mx-auto'>
                <div className='relative bg-white w-full h-fit px-2 rounded-lg'>
                    <div className='absolute top-4 right-4'>
                        <CloseModal />
                    </div>
                    <ContactUsForm />
                </div>
            </div>
        </div>
    )
}

export default ContactModal