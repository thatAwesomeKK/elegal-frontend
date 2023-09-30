'use client'
import OrdersCard from '@/components/Orders/OrdersCard'
import { Service, User } from '@/lib/typings'
import React, { useEffect, useRef } from 'react'
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchProfileServiceRequest } from '@/lib/apiCalls/service';
import { useAppSelector } from '@/lib/redux/store';

interface PageProps {
    initialOrders: Service[]
    session: string
}

const OrdersContainer = ({ initialOrders }: PageProps) => {
    const user: User = useAppSelector(store => store.user.user)

    const lastOrderRef = useRef<HTMLElement>(null)

    const { ref, entry } = useIntersection({
        root: lastOrderRef.current,
        threshold: 1,
    });

    const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(['infinite-query'], async ({ pageParam = 1 }) => {
        const orders = await fetchProfileServiceRequest(undefined, 6, pageParam)
        return orders as Service[]
    },
        {
            getNextPageParam: (_, pages) => {
                return pages.length + 1
            },
            initialData: { pages: [initialOrders], pageParams: [1] }
        }
    )


    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage()
        }
    }, [entry, fetchNextPage])

    const orders = data?.pages.flatMap(page => page) ?? initialOrders

    return <section>
        <ul className='flex flex-col justify-center items-center md:grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
            {orders.map((order, i) => {
                if (i === orders.length - 1)
                    return <li key={i} ref={ref}><OrdersCard order={order} user={user} /></li>
                else
                    return <OrdersCard key={i} order={order} user={user} />
            })}
        </ul>
        {isFetchingNextPage && <p>Loading....</p>}
    </section>
}

export default OrdersContainer