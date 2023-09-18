import { verifyEmail } from "@/lib/apiCalls/auth";
import Link from "next/link";
import React from "react";

interface PageProps {
    params: {
        token: string;
    };
}

const VerifyEmail = async ({ params: { token } }: PageProps) => {
    const payload = await verifyEmail(token)
    return (
        <main className="flex justify-center items-center h-[93.5vh]">
            <section className="flex space-y-4 flex-col justify-center items-center h-[30%] rounded-xl shadow-lg bg-white w-[30%] border-2 border-gray-300">
                {payload.success ?
                    <h1 className="text-6xl font-bold text-green-300">{payload.message}</h1> :
                    <h1 className="text-6xl font-bold text-red-300">{payload.error}</h1>
                }
                <Link className='bg-blue-400 active:bg-blue-400 hover:bg-blue-500 shadow-sm py-3 px-4 rounded-2xl w-[50%] font-medium text-center' href='/auth/login'>Click Me to go back to login!</Link>
            </section>
        </main>
    )
};

export default VerifyEmail;
