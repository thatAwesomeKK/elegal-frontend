import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className='flex justify-center items-center flex-col xl:flex-row min-h-screen w-screen'>
            <section className="flex-1 flex justify-center items-center w-full">
                <div className='bg-white shadow-lg p-10 h-full w-full 2xl:w-[70%] xl:w-[80%] lg:w-[50%] md:w-[60%] flex flex-col justify-between items-start'>
                    <Skeleton className="w-72 h-10 mb-2" />
                    <div className='flex flex-col gap-3 w-full'>
                        <Skeleton className="w-40 h-7" />
                        <Skeleton className="w-full h-20" />
                    </div>
                    <Skeleton className="w-full h-44" />
                </div>
            </section>
            <section className='flex-1 flex flex-col justify-center items-center'>
                <h2 className='font-bold text-3xl text-gray-600 text-center'>Applied Service Providers</h2>
                <hr className="border-1 w-44 border-gray-400 mt-2 mb-5" />
                <div className="flex flex-col justify-center items-center gap-5">
                    <PotentialProvidersSkeleton />
                    <PotentialProvidersSkeleton />
                    <PotentialProvidersSkeleton />
                </div>
            </section>
        </main>
    )
}

const PotentialProvidersSkeleton = () => {
    return (
        <div className='w-96 h-fit bg-white rounded-lg px-5 py-6 flex flex-col gap-3'>
            <div className="flex items-center space-x-4 mb-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-12 w-full" />
        </div>
    )
}