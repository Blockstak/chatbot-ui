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

  return (
    <nav className="h-24 bg-neutral-800">
      <div className="flex items-center justify-between px-4 h-full">
        <Link className="text-neutral-200" href={router.pathname}>
          <RiDoorOpenLine className="w-12 h-12" />
        </Link>
        <div className="px-6 py-3 bg-neutral-900 rounded-lg inline-flex items-center gap-x-2">
          <Image
            width={100}
            height={100}
            alt="User Logo"
            src="/user.jpeg"
            className="w-10 h-10 rounded-full object-cover object-center"
          />
          <div className="text-zinc-100 capitalize">
            {data?.user?.username ?? "Anonymous"}
          </div>
        </div>
      </div>
    </nav>
  );
}
