
import { ImageSlider } from "@/components/Home/ImageSlider";
import CheckUserRoleService from "@/components/Home/CheckUserRoleService";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Feedbacks = dynamic(() => import('@/components/Home/Feedbacks').then((module) => module.Feedbacks))

export default async function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeComponents />
    </Suspense>
  )
}

const HomeComponents = () => {
  return <main className="h-content-height w-full">
    <ImageSlider />
    <hr className="border-1 border-gray-300" />
    <CheckUserRoleService />
    <hr className="border-1 border-gray-300" />
    <Feedbacks />
    <hr className="border-1 border-gray-300" />
  </main>
}
