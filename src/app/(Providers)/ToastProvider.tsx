"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default ToastProviders;
