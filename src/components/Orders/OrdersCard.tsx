import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Progress } from '../ui/progress'
import Link from 'next/link'
import { Service, User } from '@/lib/typings'
import { Badge } from '../ui/badge'
import { SuccessProgress } from '../ui/CustomShadcn/SuccessProgress'

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
            <Card className={`w-96 h-96 flex flex-col justify-between border-2 ${order.life === 'received' ? "border-green-300" : "border-blue-400"}`}>
                <CardHeader>
                    <CardTitle className='flex flex-col gap-2'>
                        <div>
                            {order.life === 'received' ? <Badge className='w-fit bg-green-500 text-center hover:bg-green-500'>Completed</Badge> : <Badge className='w-fit text-center'>In Progress</Badge>}
                            {(order.life === 'received' && !order.feedback) && <Link className='ml-2 text-sm font-normal hover:text-blue-400' href={`/feedback?orderId=${order._id}`}>Give us feedback</Link>}
                        </div>
                        <span className='capitalize font-bold'>{order.type}({order.caseType})</span>
                    </CardTitle>
                    <CardDescription className='font-medium'>
                        <span className='font-semibold text-lg text-black block'>Description:</span>
                        {order.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p><span className='font-medium'>Stage:</span> {(user?.role === "buyer" && order.life === 'received') ? 'received' : order.life}</p>
                    {order.life === 'received' ? <SuccessProgress /> : <Progress value={lifeStage(order.life)} />}
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
                    {(order.life === 'received' && !order.rating) && <Link className='ml-2 text-sm font-normal hover:text-blue-400' href={`/profile/rating?legalProviderId=${order.LegalProviderId?._id}`}>Give me rating</Link>}
                </CardContent>
                <CardFooter>
                    <Link className={`${order.life === 'received' ? "bg-green-400":"bg-blue-500"} py-3 px-4 rounded-xl w-full text-center`} href={`orders/${order._id}`}>Know More</Link>
                </CardFooter>
            </Card>
        </>
    )
}

export default OrdersCard