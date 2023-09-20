import { Feedbacks } from "@/components/Home/Feedbacks";
import { ImageSlider } from "@/components/Home/ImageSlider";
import CheckUserRoleService from "@/components/Home/CheckUserRoleService";
import { Suspense } from "react";

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
