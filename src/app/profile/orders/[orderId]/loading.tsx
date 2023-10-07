import { Skeleton } from "@/components/ui/skeleton";
import AppliedServiceProvidersLoading from "./AppliedServiceProviderLoading";

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
            <AppliedServiceProvidersLoading />
        </main>
    )
}
