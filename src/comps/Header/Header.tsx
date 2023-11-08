import Link from "next/link";
import { useRouter } from "next/router";
import { RiDoorOpenLine } from "react-icons/ri";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pageTitles } = useAppSelector((state) => state.ui);

  const path = router.pathname
    .split("/")
    [router.pathname.split("/").length - 1].replace(/-/g, " ");

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
          <div className="text-zinc-100">Header People</div>
        </div>
      </div>
    </nav>
  );
}
