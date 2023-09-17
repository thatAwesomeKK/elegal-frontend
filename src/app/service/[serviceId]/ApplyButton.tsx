'use client'
import { Button } from '@/components/ui/button'
import { applyToService } from '@/lib/apiCalls/service';
import { Service } from '@/lib/typings'
import React from 'react'

interface PageProps {
    service: Service;
    accessToken: string;
}

const ApplyButton = ({ service, accessToken }: PageProps) => {
    const onSubmit = async () => {
        const res = await applyToService(accessToken, service._id)
        console.log(res);
    }
    return (
        <Button onClick={onSubmit} className='w-full h-12'>Apply</Button>
    )
}

export default ApplyButton