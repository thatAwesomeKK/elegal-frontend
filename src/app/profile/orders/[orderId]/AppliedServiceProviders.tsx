import PotentialProvidersCard from '@/components/Orders/PotentialProvidersCard'
import { fetchAppliedProviders } from '@/lib/apiCalls/service'
import { Provider, Service } from '@/lib/typings'
import { cookies } from 'next/headers'
import React from 'react'

const AppliedServiceProviders = async ({ service }: { service: Service }) => {
    const cookieStore = cookies()
    const session = cookieStore.get('sid')?.value

    const providers: Provider[] = await fetchAppliedProviders(session!, service._id)

    return (
        <div className='flex items-center flex-col overflow-y-scroll scrollbar-hide mt-5 py-3'>
            {providers.length > 0 && providers.map((provider, i) => (
                <PotentialProvidersCard service={service} session={session!} provider={provider} key={i} />
            ))}
        </div>
    )
}

export default AppliedServiceProviders