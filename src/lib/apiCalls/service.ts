import { toast } from "react-toastify";
import { alertCall } from "../toast/alertCall";

const isServer = typeof window === 'undefined';
let host_url

if(isServer) 
  host_url = process.env.BACKEND_URL
else 
  host_url = process.env.NEXT_PUBLIC_BACKEND_URL

const base_url = `${host_url}/api/service-request`;

export const createServiceRequest = async (data: any, accessToken: any) => {
  const id = toast.loading("Please Wait...");
  try {
    const payload = await fetch(`${base_url}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log(payload);
    alertCall(payload, id);
  } catch (error) {
    console.log(error);
  }
};

export const fetchProfileServiceRequest = async (accessToken: any) => {
  try {
    const payload = await fetch(`${base_url}/profile-fetch`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMatchServiceRequest = async (accessToken: any) => {
  try {
    const payload = await fetch(`${base_url}/fetch-bestmatch`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAvailableServiceRequest = async (accessToken: any) => {
  try {
    const payload = await fetch(`${base_url}/fetch-available`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const fetchServiceWithId = async (
  accessToken: any,
  serviceId: string
) => {
  try {
    const payload = await fetch(
      `${base_url}/fetch-withid?serviceId=${serviceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const applyToService = async (
  accessToken: string,
  serviceId: string,
  price: string
) => {
  try {
    const payload = await fetch(`${base_url}/service-life?life=assigned`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ serviceId, price }),
    }).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const payForService = async (accessToken: string, serviceId: string) => {
  try {
    const payload = await fetch(`${base_url}/service-life?life=paid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ serviceId }),
    }).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const completeService = async (
  accessToken: string,
  serviceId: string
) => {
  try {
    const payload = await fetch(`${base_url}/service-life?life=completed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ serviceId }),
    }).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};
