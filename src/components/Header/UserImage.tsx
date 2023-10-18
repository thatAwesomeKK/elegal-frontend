import Image from "next/image";

export default function UserImage({ pfp }: { pfp?: string }) {
    return (
        <div className="w-10 rounded-full">
            <Image src={pfp || "/assets/no_profile.png"} alt={"Profile Picture"} width={25} height={25} />
        </div>
    )
}