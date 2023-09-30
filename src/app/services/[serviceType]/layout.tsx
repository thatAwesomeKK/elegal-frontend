import { Tabs } from "@/components/ui/tabs"
import ServiceNav from "./ServiceNav"
import React from "react"

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
  return <section className='flex w-full justify-center items-center mt-[20px] md:mt-[80px] px-4 md:px-0'>
    <Tabs className='w-full sm:w-[580px] h-max rounded-lg'
      defaultValue={serviceType as string || "advocate"}>
      <ServiceNav />
      {children}
    </Tabs>
  </section>
}