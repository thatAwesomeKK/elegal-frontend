import { store } from "../redux/store";
import { alertCall } from "../toast/alertCall";
import { storeUser } from "../redux/slice/userSlice";

const isServer = typeof window === 'undefined';
let host_url

if(isServer) 
  host_url = process.env.BACKEND_URL
else 
  host_url = process.env.NEXT_PUBLIC_BACKEND_URL
const base_url = `${host_url}/api/auth`;

export const login = async (data: any) => {
  try {
    const payload = await fetch(`${base_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log(payload);
    alertCall(payload);
    timeOut(1000);
  } catch (error) {
    console.log(error);
  }
};

export const register = async (data: any) => {
  try {
    const payload = await fetch(`${base_url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log(payload);
    alertCall(payload);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (accessToken: any) => {
  try {
    const payload = await fetch(`${base_url}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }).then((res) => res.json());
    store.dispatch(storeUser(null));
    alertCall(payload);
    timeOut(1000);
  } catch (error) {
    console.log(error);
  }
};

const timeOut = (timer: number) => {
  setTimeout(() => {
    window.location.reload();
  }, timer);
};
