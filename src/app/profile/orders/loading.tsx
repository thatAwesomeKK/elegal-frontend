import OrderContainerSkeleton from '@/components/Orders/OrdersContainerSkeleton'
import { Permanent_Marker } from 'next/font/google'
const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: '400' })

export default function Loading() {
    return (
        <main className="max-w-7xl mx-auto py-10">
            <h1 className={`${permanentMarker.className} text-gray-600 text-8xl font-bold text-center mb-16 underline`}>Orders</h1>
            <section className='grid grid-cols-3 gap-10'>
                <OrderContainerSkeleton />
                <OrderContainerSkeleton />
                <OrderContainerSkeleton />
                <OrderContainerSkeleton />
                <OrderContainerSkeleton />
            </section>
        </main>)
}