import OrdersCard from '@/components/Orders/OrdersCard'
import { fetchProfileServiceRequest } from '@/lib/apiCalls/service'
import { cookies } from 'next/headers'
import { Permanent_Marker } from 'next/font/google'
import React from 'react'
import { store } from '@/lib/redux/store'

const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: '400' })

const Orders = async () => {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const orders = await fetchProfileServiceRequest(accessToken)

    const user = store.getState().user.user

    return (
        <main className="max-w-7xl mx-auto py-10">
            <h1 className={`${permanentMarker.className} text-gray-600 text-8xl font-bold text-center mb-16 underline`}>Orders</h1>
            <section className='grid grid-cols-3 gap-10'>
                {orders.map((order: any, i: number) => (
                    <OrdersCard key={i} order={order} user={user}/>
                ))}
            </section>
        </main>
    )
}

export default Orders