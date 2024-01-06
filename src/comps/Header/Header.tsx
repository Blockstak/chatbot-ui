import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useProfileQuery } from "@/api/auth";
import { RiDoorOpenLine } from "react-icons/ri";

export default function Header() {
  const router = useRouter();
  const { data, isLoading, isError } = useProfileQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  const fullName =
    data?.first_name !== "" && data?.last_name !== ""
      ? `${data?.first_name} ${data?.last_name}`
      : data.username;

  return (
    <nav className="h-24 bg-neutral-800">
      <div className="flex items-center justify-between px-4 md:px-16 h-full">
        <Link className="text-neutral-200" href={router.pathname}>
          <RiDoorOpenLine className="w-12 h-12" />
        </Link>
        <div className="px-6 py-3 bg-neutral-900 rounded-lg inline-flex items-center gap-x-2">
          {data?.profile?.profile_photo ? (
            <Image
              width={100}
              height={100}
              alt="User Logo"
              src="/placeholder.jpg"
              className="w-10 h-10 rounded-full object-cover object-center"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-daisy-bush-300">
              <div className="capitalize tracking-[-0.10rem] flex items-center justify-center w-full h-full text-xl font-bold text-neutral-800">
                {fullName.charAt(0)}
              </div>
            </div>
          )}
          <div className="text-zinc-100">{fullName ?? "Anonymous"}</div>
        </div>
      </div>
    </nav>
  );
}
