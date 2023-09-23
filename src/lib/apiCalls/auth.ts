import { store } from "../redux/store";
import { alertCall } from "../toast/alertCall";
import { storeUser } from "../redux/slice/userSlice";
import { toast } from "react-toastify";

const isServer = typeof window === "undefined";
let host_url;

if (isServer) host_url = process.env.BACKEND_URL;
else host_url = process.env.NEXT_PUBLIC_BACKEND_URL;
const base_url = `${host_url}/api/auth`;

export const login = async (data: any) => {
  const id = toast.loading("Please Wait...");
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
    alertCall(payload, id);
    timeOut(1000);
  } catch (error) {
    console.log(error);
  }
};

export const register = async (data: any) => {
  const id = toast.loading("Please Wait...");
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
    alertCall(payload, id);
  } catch (error) {
    console.log(error);
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const payload = await fetch(`${base_url}/verify-email`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((res) => res.json());
    console.log(payload);
    return payload;
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (email: string) => {
  const id = toast.loading("Please Wait...");
  try {
    const payload = await fetch(`${base_url}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((res) => res.json());
    alertCall(payload, id);
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (token: string, password: string) => {
  const id = toast.loading("Please Wait...");
  try {
    const payload = await fetch(`${base_url}/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ password }),
    }).then((res) => res.json());
    alertCall(payload, id);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (session: any) => {
  const id = toast.loading("Please Wait...");
  try {
    const payload = await fetch(`${base_url}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `sid=${session}`,
      },
      credentials: "include",
    }).then((res) => res.json());
    store.dispatch(storeUser(null));
    alertCall(payload, id);
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
