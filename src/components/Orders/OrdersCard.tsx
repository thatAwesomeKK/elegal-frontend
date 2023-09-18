import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Progress } from '../ui/progress'
import Link from 'next/link'
import { Service, User } from '@/lib/typings'
import { Badge } from '../ui/badge'

interface PageProps {
    order: Service
    user: User
}

const OrdersCard = ({ order, user }: PageProps) => {

    const lifeStage = (life: string) => {
        switch (life) {
            case "created":
                return 20;
            case "assigned":
                return 40;
            case "paid":
                return 60;
            case "completed":
                return 80;
            case "received":
                return 100;
            default:
                break;
        }
    }

    return (
        <>
            <Card className="w-96 h-96 flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className='flex flex-col gap-2'>
                        {order.life === 'received' ? <Badge className='w-fit bg-green-500 text-center'>Completed</Badge> : <Badge className='w-fit text-center'>In Progress</Badge>}
                        <span className='capitalize font-bold'>{order.type}({order.caseType})</span>
                    </CardTitle>
                    <CardDescription className='font-medium'>
                        <span className='font-semibold text-lg text-black block'>Description:</span>
                        {order.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p><span className='font-medium'>Stage:</span> {user?.role === "buyer" ? "received" : "delivered"}</p>
                    <Progress className='' value={lifeStage(order.life)} />
                    <div className='flex items-center gap-3 mt-3'>
                        <p className='font-semibold text-lg'>Assigned To:</p>
                        {order.LegalProviderId ? <>
                            <Avatar>
                                <AvatarImage src={order.LegalProviderId.pfp} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p>{order.LegalProviderId.username}</p>
                        </> : <p className='text-red-500 font-semibold'>No Service Provider Assigned</p>}
                    </div>
                </CardContent>
                <CardFooter className=''>
                    <Link className='bg-blue-500 py-3 px-4 rounded-xl w-full text-center' href={`orders/${order._id}`}>Know More</Link>
                </CardFooter>
            </Card>
        </>
    )
}

export default OrdersCard