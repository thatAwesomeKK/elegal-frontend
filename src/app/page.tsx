import { Feedbacks } from "@/components/Home/Feedbacks";
import { ImageSlider } from "@/components/Home/ImageSlider";
import CheckUserRoleService from "@/components/Home/CheckUserRoleService";

export default async function Home() {
  return (
    <main className="h-content-height w-full">
      <ImageSlider />
      <hr className="border-1 border-gray-300" />
      <CheckUserRoleService />
      <hr className="border-1 border-gray-300" />
        <Feedbacks />
      <hr className="border-1 border-gray-300" />
    </main>
  )
}
