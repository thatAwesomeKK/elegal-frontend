import OrdersCard from '@/components/Orders/OrdersCard'
import { fetchProfileServiceRequest } from '@/lib/apiCalls/service'
import { cookies } from 'next/headers'
import { Permanent_Marker } from 'next/font/google'
import React from 'react'
import { store } from '@/lib/redux/store'
import { Service } from '@/lib/typings'

const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: '400' })

const Orders = async () => {
    const cookieStore = cookies()
    const session = cookieStore.get('sid')?.value

    const orders: Service[] = await fetchProfileServiceRequest(session!)

    return (
        <main className="lg:max-w-7xl mx-auto py-10">
            <h1 className={`${permanentMarker.className} text-gray-600 text-8xl font-bold text-center mb-16 underline`}>Orders</h1>
            <section className='flex flex-col justify-center items-center md:grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
                <OrdersContainer orders={orders} />
            </section>
        </main>
    )
}

const OrdersContainer = ({ orders }: { orders: Service[] }) => {
    const user = store.getState().user.user
    return <>
        {orders.map((order, i) => (
            <OrdersCard key={i} order={order} user={user} />
        ))}</>

}

export default Orders