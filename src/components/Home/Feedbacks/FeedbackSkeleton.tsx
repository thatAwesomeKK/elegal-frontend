import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const FeedbackSkeleton = () => {
  return (
    <div className='flex gap-5 overflow-hidden'>
      <Feedback />
      <Feedback />
      <Feedback />
      <Feedback />
      <Feedback />
    </div>
  )
}

const Feedback = () => {
  return <Skeleton className='h-60 w-96 bg-white rounded-3xl shadow-lg border-4 border-blue-200 px-6 py-5 flex flex-col justify-evenly gap-5 items-center'>
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    <div className='flex-1 w-[97%]'>
      <Skeleton className="h-full w-full rounded-lg" />
    </div>
  </Skeleton>
}

export default FeedbackSkeleton