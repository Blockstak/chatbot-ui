import { useRouter } from "next/router";
import {
  HiPlus,
  HiSearch,
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineUser,
} from "react-icons/hi";
import { logout } from "@/state/slices/authSlice";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import { StatelessSelectInput } from "@ui/Forms/Inputs";

const Chats = [
  {
    date: "Today",
    chats: [
      "Explain Large Language models",
      "Explain Large Language models",
      "Explain Large Language models",
      "Explain Large Language models",
    ],
  },
  {
    date: "Last 7 days",
    chats: [
      "Explain Large Language models",
      "Explain Large Language models",
      "Explain Large Language models",
      "Explain Large Language models",
      "Explain Large Language models",
      "Explain Large Language models",
      "Explain Large Language models",
      "Explain Large Language models",
      "Explain Large Language models",
    ],
  },
];

const navItems = [
  {
    label: "Dashboard",
    icon: <HiOutlineHome className="text-neutral-200 w-6 h-6" />,
    href: "/dashboard",
  },
  {
    label: "Dashboard",
    icon: <HiOutlineCog className="text-neutral-200 w-6 h-6" />,
    href: "/dashboard",
  },
  {
    label: "Dashboard",
    icon: <HiOutlineUser className="text-neutral-200 w-6 h-6" />,
    href: "/dashboard",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/auth/login";
  };

  return (
    <nav className="hidden md:flex md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row bg-neutral-950 md:w-[20rem]">
      <nav className="h-full bg-neutral-800">
        <ul className="flex flex-col list-none gap-y-4 mt-6">
          {navItems.map((item, index) => (
            <li className="p-3 cursor-pointer" key={index}>
              {item.icon}
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col flex-wrap">
        <div className="flex flex-col items-center relative mt-4 overflow-y-auto flex-1 p-4">
          <div className="relative flex flex-wrap items-center">
            <input
              placeholder="Search"
              className="w-full border-2 p-3 rounded-lg focus:outline-none bg-transparent placeholder-neutral-200"
            />
            <HiSearch className="text-neutral-200 inline-flex h-full absolute right-2 items-center justify-center w-8 pl-2 py-2" />
          </div>

          <div className="flex flex-wrap items-center mt-4 w-full border-2 p-3 rounded-lg">
            <span className="text-neutral-200">New Topic</span>
            <HiPlus className="text-neutral-200 inline-flex h-full absolute right-6 items-center justify-center w-8 pl-2 py-2" />
          </div>

          {/* <div className="w-full mt-4">
            <StatelessSelectInput
              label=""
              registerName="timeline"
              className="w-full mt-4"
              options={[
                { label: "Today", value: "1 " },
                { label: "Last 7 days", value: "7" },
                { label: "Last Month", value: "30" },
              ]}
            />
          </div> */}

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            {Chats.map((chat) => (
              <li key={chat.date}>
                <div className="text-neutral-200 text-sm py-3 px-2 font-medium flex justify-between items-center">
                  <div>
                    <span className="mb-4 block text-neutral-500">
                      {chat.date}
                    </span>
                    <div className="flex flex-col gap-y-4">
                      {chat.chats.map((c, index) => (
                        <span key={index} className="text-sm">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex justify-center p-6">
          <button
            onClick={handleLogout}
            className="w-full p-4 rounded-xl inline-flex justify-center items-center gap-x-2 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
          >
            <span>Logout</span>
            <RiLogoutCircleRLine />
          </button>
        </div>
      </div>
    </nav>
  );
}
