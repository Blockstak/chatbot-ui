import { useRouter } from "next/router";
import { HiSearch } from "react-icons/hi";
import { StatelessSelectInput } from "@ui/Forms/Inputs";

import {
  RiArchiveLine,
  RiRoadMapLine,
  RiPriceTag2Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";

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

export default function Sidebar() {
  const router = useRouter();

  return (
    <nav className="hidden md:flex md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row bg-neutral-900 md:w-72 p-4">
      <div className="flex flex-col flex-wrap">
        <div
          className={`flex flex-col items-center relative mt-4 overflow-y-auto flex-1`}
        >
          <div className="relative flex flex-wrap items-center">
            <input
              placeholder="Search"
              className="w-full border-2 py-2 px-3 rounded-lg focus:outline-none bg-transparent placeholder-neutral-200"
            />
            <HiSearch className="text-neutral-200 inline-flex h-full absolute right-2 items-center justify-center w-8 pl-2 py-2" />
          </div>

          <div className="w-full mt-4">
            <StatelessSelectInput
              label=""
              registerName="company"
              className="w-full mt-4"
              options={[
                { label: "Today", value: "1 " },
                { label: "Last 7 days", value: "7" },
                { label: "Last Month", value: "30" },
              ]}
            />
          </div>

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            {Chats.map((chat) => (
              <li key={chat.date}>
                <div
                  className={`text-neutral-200 text-sm py-3 px-2 font-medium flex justify-between items-center 
                      `}
                >
                  <div className="">
                    <span className="mb-4 block text-neutral-500 font-medium">
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
          <button className="w-full p-4 rounded-xl inline-flex justify-center items-center gap-x-2 bg-neutral-800 text-neutral-200 hover:bg-neutral-700">
            <span>Logout</span>
            <RiLogoutCircleRLine />
          </button>
        </div>
      </div>
    </nav>
  );
}
