import { toast } from "react-toastify";
import { alertCall } from "../toast/alertCall";

const isServer = typeof window === "undefined";
let host_url;

if (isServer) host_url = process.env.BACKEND_URL;
else host_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const base_url = `${host_url}/api/service-request`;

export const createServiceRequest = async (data: any) => {
  const id = toast.loading("Please Wait...");
  try {
    const payload = await fetch(`${base_url}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => res.json());
    alertCall(payload, id);
  } catch (error) {
    console.log(error);
  }
};

export const fetchProfileServiceRequest = async (
  session?: string,
  limit?: number,
  page?: number
) => {
  try {
    const options: RequestInit = isServer
      ? {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `sid=${session}`,
          },
        }
      : {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };

    const payload = await fetch(
      `${base_url}/profile-fetch?limit=${limit}&page=${page}`,
      options
    ).then((res) => res.json());
    return payload.message.orders;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMatchServiceRequest = async (session?: string) => {
  try {
    const payload = await fetch(`${base_url}/fetch-bestmatch`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `sid=${session}`,
      },
      credentials: "include",
    }).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAvailableServiceRequest = async (session?: string) => {
  try {
    const payload = await fetch(`${base_url}/fetch-available`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `sid=${session}`,
      },
      credentials: "include",
    }).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const fetchServiceWithId = async (
  session: string,
  serviceId: string
) => {
  try {
    const payload = await fetch(
      `${base_url}/fetch-with-serviceid?serviceId=${serviceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `sid=${session}`,
        },
        credentials: "include",
      }
    ).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrderWithId = async (session: string, serviceId: string) => {
  try {
    const payload = await fetch(
      `${base_url}/fetch-with-orderid?serviceId=${serviceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `sid=${session}`,
        },
        credentials: "include",
        cache: "no-store",
        next: { revalidate: 0 },
      }
    ).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAppliedProviders = async (
  session: string,
  serviceId: string
) => {
  try {
    const payload = await fetch(
      `${base_url}/fetch-applied-providers?serviceId=${serviceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `sid=${session}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    ).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const applyToService = async (serviceId: string, price: string) => {
  const id = toast.loading("Please Wait....");
  try {
    const payload = await fetch(`${base_url}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ serviceId, price }),
    }).then((res) => res.json());
    alertCall(payload, id);
  } catch (error) {
    console.log(error);
  }
};

export const assignServiceProvider = async (
  serviceId: string,
  serviceProviderId: string,
  price: string
) => {
  const id = toast.loading("Please Wait....");
  try {
    const payload = await fetch(`${base_url}/service-life?life=assigned`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ serviceId, price, serviceProviderId }),
    }).then((res) => res.json());
    alertCall(payload, id);
  } catch (error) {
    console.log(error);
  }
};

export const payForService = async (serviceId: string) => {
  try {
    const payload = await fetch(`${base_url}/service-life?life=paid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serviceId }),
      credentials: "include",
    }).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const completeService = async (serviceId: string) => {
  try {
    const payload = await fetch(`${base_url}/service-life?life=completed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serviceId }),
      credentials: "include",
    }).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const receivedService = async (serviceId: string) => {
  try {
    const payload = await fetch(`${base_url}/service-life?life=received`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ serviceId }),
    }).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};
