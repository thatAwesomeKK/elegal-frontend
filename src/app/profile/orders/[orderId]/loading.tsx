import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className='max-w-7xl mx-auto flex flex-row justify-center items-center h-[93.5vh]'>
            <section className='flex-1 flex flex-col justify-center items-center min-h-full overflow-hidden overflow-y-scroll py-10 gap-10 scrollbar-hide'>
                <h2 className='font-bold text-3xl text-gray-600'>Applied Service Providers</h2>
                <hr className="border-1 w-44 border-gray-400" />
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
            </section>
            <section className="flex-1">
                <div className='bg-white shadow-lg p-10 h-[50%] flex flex-col gap-3 justify-between items-start'>
                    <Skeleton className="w-72 h-10" />
                    <div className='flex flex-col gap-1 w-full'>
                        <Skeleton className="w-40 h-7" />
                        <Skeleton className="w-full h-20" />
                    </div>
                    <Skeleton className="w-full h-44" />
                </div>
            </section>
        </main>
    )
}