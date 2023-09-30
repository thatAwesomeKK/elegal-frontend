import { fetchProfileServiceRequest } from '@/lib/apiCalls/service'
import { cookies } from 'next/headers'
import { Permanent_Marker } from 'next/font/google'
import React from 'react'
import OrdersContainer from './OrdersContainer'
import ProvidesQueryClient from '@/app/(Providers)/ProvidesQueryClient'
import ReduxProvider from '@/app/(Providers)/ReduxProvider'

const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: '400' })

const Orders = async () => {
    const cookieStore = cookies()
    const session = cookieStore.get('sid')?.value

    const orders = await fetchProfileServiceRequest(session!)

    return (
        <main className="lg:max-w-7xl mx-auto py-10">
            <h1 className={`${permanentMarker.className} text-gray-600 text-8xl font-bold text-center mb-16 underline`}>Orders</h1>

            <ProvidesQueryClient>
                <ReduxProvider>
                    <OrdersContainer initialOrders={orders} session={session!} />
                </ReduxProvider>
            </ProvidesQueryClient>

        </main>
    )
}

export default Orders