import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Provider, Service } from '@/lib/typings'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import ChooseProviderButton from './ChooseProviderButton'

interface PageProps {
    service: Service
    accessToken: string
    provider: Provider
}

const PotentialProvidersCard = ({ service, accessToken, provider }: PageProps) => {
    return (
        <>
            <Card className="w-96 h-60 flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className='flex flex-row gap-2 items-center'>
                        <Avatar>
                            <AvatarImage src={provider.uid?.pfp} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className='text-xl font-bold'>{provider.uid?.username}</span>
                    </CardTitle>
                    <CardDescription className='font-medium'>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='ml-2'>
                        <span className='font-medium text-lg'>Price: </span>{provider.price}
                    </p>
                </CardContent>
                <CardFooter>
                    <ChooseProviderButton accessToken={accessToken} service={service} provider={provider}/>
                </CardFooter>
            </Card>
        </>
    )
}

export default PotentialProvidersCard