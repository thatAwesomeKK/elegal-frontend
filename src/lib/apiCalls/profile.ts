import { alertCall } from "../toast/alertCall";

const isServer = typeof window === 'undefined';
let host_url

if(isServer) 
  host_url = process.env.BACKEND_URL
else 
  host_url = process.env.NEXT_PUBLIC_BACKEND_URL

const base_url = `${host_url}/api/profile`;

export const getProfileRedux = async (accessToken: string) => {
  try {
    const payload = await fetch(`${base_url}/fetch-min`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
    // console.log(payload);
    if(!payload.success)
       return null
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (accessToken: string) => {
  try {
    const payload = await fetch(`${base_url}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
    // console.log(payload);
    return payload.message;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (data: any, accessToken: string) => {
  try {
    const payload = await fetch(`${base_url}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    alertCall(payload)
  } catch (error) {
    console.log(error);
  }
};
