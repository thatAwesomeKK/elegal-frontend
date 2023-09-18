import { verifyEmail } from "@/lib/apiCalls/auth";
import React from "react";

interface PageProps {
    params: {
        token: string;
    };
}

const VerifyEmail = async ({ params: { token } }: PageProps) => {
    const payload = await verifyEmail(token)
    if (payload.success)
        return <h1 className="text-8xl font-bold">{payload.message}</h1>;
    else
        return <h1 className="text-8xl font-bold">{payload.error}</h1>;
};

export default VerifyEmail;
