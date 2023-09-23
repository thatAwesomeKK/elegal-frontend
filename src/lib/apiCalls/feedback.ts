import { toast } from "react-toastify";
import { alertCall } from "../toast/alertCall";

const isServer = typeof window === "undefined";
let host_url;

if (isServer) host_url = process.env.BACKEND_URL;
else host_url = process.env.NEXT_PUBLIC_BACKEND_URL;
const base_url = `${host_url}/api/feedback`;

export const getFeedbacks = async () => {
  try {
    const payload = await fetch(`${base_url}/fetch`).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const createFeedback = async (
  description: string,
  serviceId: string
) => {
  const id = toast.loading("Please Wait...");
  try {
    const payload = await fetch(`${base_url}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ description, serviceId }),
    }).then((res) => res.json());
    alertCall(payload, id);
  } catch (error) {
    console.log(error);
  }
};
