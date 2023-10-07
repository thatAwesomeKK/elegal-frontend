import { Tabs } from "@/components/ui/tabs"
// import ServiceNav from "./ServiceNav"
import React from "react"
import dynamic from "next/dynamic"
const ServiceNav = dynamic(() => import('./ServiceNav'), { ssr: false, loading: () => <p>Loading....</p> })

interface PageProps {
  params: {
    serviceType: string
  },
  children: React.ReactNode
}


export default function ServicesLayout({
  params: { serviceType },
  children,
}: PageProps) {
  return <ServiceNav serviceType={serviceType} children={children} />
}