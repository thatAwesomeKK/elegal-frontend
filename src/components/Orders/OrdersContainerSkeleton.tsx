import React from 'react'
import { Skeleton } from '../ui/skeleton'

const OrdersContainerSkeleton = () => {
    return (
        <div className="w-96 h-96 rounded-lg bg-white py-5 px-4 flex flex-col space-y-4 justify-evenly">
            <div className='flex flex-col gap-3'>
                <Skeleton className="h-10 w-28 rounded-xl" />
                <div>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-32 w-full mt-1" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            <Skeleton className="h-12 w-full" />
        </div>
    )
}

export default OrdersContainerSkeleton