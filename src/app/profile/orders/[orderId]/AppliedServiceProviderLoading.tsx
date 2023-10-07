import React from 'react'
import PotentialProvidersSkeleton from './PotentialProvidersSkeleton'

const AppliedServiceProvidersLoading = () => {
    return <section className='flex-1 flex flex-col justify-center items-center'>
        <h2 className='font-bold text-3xl text-gray-600 text-center'></h2>
        <div className="flex flex-col justify-center items-center gap-5">
            <PotentialProvidersSkeleton />
            <PotentialProvidersSkeleton />
            <PotentialProvidersSkeleton />
        </div>
    </section>
}

export default AppliedServiceProvidersLoading