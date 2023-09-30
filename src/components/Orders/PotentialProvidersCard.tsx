import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Provider, Service } from '@/lib/typings'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import ChooseProviderButton from './ChooseProviderButton'
import { store } from '@/lib/redux/store'
import Image from 'next/image'

interface PageProps {
    service: Service
    session?: string
    provider: Provider
}

const PotentialProvidersCard = ({ service, session, provider }: PageProps) => {
    const user = store.getState().user.user
    return (
        <>
            <Card className="w-96 h-fit flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className='flex flex-row gap-2 items-center'>
                        <Avatar>
                            <AvatarImage src={provider.uid?.pfp} />
                            <AvatarFallback><Image className='object-cover' src="/assets/no_profile.png" alt='' height={50} width={50} /></AvatarFallback>
                        </Avatar>
                        <span className='text-xl font-semibold'>{provider.uid?.username}</span>
                        {provider.uid?._id === user?._id && <span className='text-sm font-light'>(You)</span>}
                    </CardTitle>
                    <CardDescription className='font-medium'>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='ml-2'>
                        <span className='font-semibold text-lg'>Price: </span>₹{provider.price}
                    </p>
                </CardContent>
                <CardFooter>
                    {session && <ChooseProviderButton service={service} provider={provider} />}
                </CardFooter>
            </Card>
        </>
    )
}

export default PotentialProvidersCard