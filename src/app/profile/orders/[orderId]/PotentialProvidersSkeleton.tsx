import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const PotentialProvidersSkeleton = () => {
    return (
        <div className='w-96 h-fit bg-white rounded-lg px-5 py-6 flex flex-col gap-3'>
            <div className="flex items-center space-x-4 mb-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-12 w-full" />
        </div>
    )
}

export default PotentialProvidersSkeleton