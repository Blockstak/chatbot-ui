import { useRouter } from "next/router";

import {
  HiX,
  HiPlus,
  HiCheck,
  HiSearch,
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineUser,
} from "react-icons/hi";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { logout } from "@/state/slices/authSlice";
import { usePostTopicsMutation } from "@/api/chatbot/topics";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import Image from "next/image";
import { useProfileQuery } from "@/api/auth";

import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { string } from "zod";

const navItems = [
  {
    label: "Home",
    icon: <HiOutlineHome className="text-neutral-200 w-6 h-6" />,
    href: "/",
  },
  // {
  //   label: "Settings",
  //   icon: <HiOutlineCog className="text-neutral-200 w-6 h-6" />,
  //   href: "/settings",
  // },
  {
    label: "Profile",
    icon: <HiOutlineUser className="text-neutral-200 w-6 h-6" />,
    href: "/profile",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [postTopics, result] = usePostTopicsMutation();
  const [inputVisible, setInputVisible] = useState(false);
  const { topics } = useAppSelector((state) => state.topic);
  const [topicList, setTopicList] = useState(topics?.results || []);

  const [expandSettings, setExpandSettings] = useState<boolean>(false);

  // ======
  const { data, isLoading, isError } = useProfileQuery();

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Something went wrong...</div>;

  const fullName =
    data?.first_name !== "" && data?.last_name !== ""
      ? `${data?.first_name} ${data?.last_name}`
      : data.username;

  useEffect(() => {
    setTopicList(topics?.results || []);
  }, [topics]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/auth/login";
  };

  const handleResetInput = () => {
    if (inputRef.current) {
      setInputVisible(false);
      inputRef.current.value = "";
      inputRef.current.type = "hidden";
    }
  };

  const handlePlusClick = () => {
    setInputVisible(true);
    if (inputRef.current) {
      inputRef.current.type = "text";
      inputRef.current.focus();
    }
  };

  const handleCheckClick = async () => {
    if (inputRef.current) {
      if (inputRef.current.value !== "") {
        const name = inputRef.current.value;
        const res = await postTopics({ name, user: 1 }).unwrap();

        if (res) handleResetInput();

        router.push(`/topic/${res.id}`);
      } else {
        handleResetInput();
      }
    }
  };

  const filterTopics = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query !== "") {
      const filteredTopics = topics?.results.filter((topic) =>
        topic.name.toLowerCase().includes(query.toLowerCase())
      );

      setTopicList(filteredTopics || []);
    } else {
      setTopicList(topics?.results || []);
    }
  };

  return (
    <nav className="hidden md:flex md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row bg-surface-secondary md:w-[17rem] rounded-[32px] my-6 ml-6">
      {/* <nav className="h-full bg-green-800">
        <ul className="flex flex-col list-none gap-y-4 mt-6">
          {navItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <li className="p-3 cursor-pointer">{item.icon}</li>
            </Link>
          ))}
        </ul>
      </nav> */}

      <div className="w-full flex flex-col flex-wrap ">
        <div className="flex flex-col items-center relative mt-4 overflow-y-auto flex-1">
          <div className="w-full px-4 pt-4">
            <div
              onClick={() => handlePlusClick()}
              onKeyDown={(e) => e.key === "Enter" && handleCheckClick()}
              className={`${
                !inputVisible &&
                `cursor-pointer text-neutral-200 hover:text-neutral-300`
              } flex items-center mb-4 w-full border-2 p-3 rounded-lg bg-daisy-bush-600 border-daisy-bush-600 `}
            >
              <input
                type="hidden"
                ref={inputRef}
                className="outline-none w-[80%] bg-transparent text-neutral-200 placeholder-neutral-200"
              />

              {!inputVisible ? (
                <div className="flex items-center">
                  <span>New Topic</span>
                  <HiPlus className="absolute right-6 w-8 h-8" />
                </div>
              ) : (
                <div className="flex items-center">
                  <HiX
                    className="absolute right-12 w-6 h-6 cursor-pointer text-neutral-200 hover:text-neutral-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleResetInput();
                    }}
                  />
                  <HiCheck
                    className="absolute right-6 w-6 h-6 cursor-pointer text-neutral-200 hover:text-neutral-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCheckClick();
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full px-4 pb-4">
            <div className="relative flex flex-wrap items-center w-full ">
              <input
                placeholder="Search"
                onChange={filterTopics}
                className="w-full border-2 p-3 pr-8 rounded-lg focus:outline-none bg-transparent text-neutral-200 placeholder-neutral-200"
              />
              <HiSearch className="text-neutral-200 inline-flex h-full absolute right-2 items-center justify-center w-8 pl-2 py-2" />
            </div>
          </div>
          <ul className="md:flex-col md:min-w-full flex flex-col list-none mt-4 p-2">
            {topicList?.map((topic) => (
              <li key={topic.id}>
                <Link
                  href={`/topic/${topic.id}`}
                  className={`${
                    id === topic.id.toString() && `bg-neutral-800`
                  } p-2 rounded-lg text-neutral-200 text-sm my-1 font-medium flex justify-between items-center`}
                >
                  <div className="flex items-center gap-x-2 hover:text-neutral-300">
                    <div className="">
                      <HiOutlineChatBubbleOvalLeftEllipsis className="w-6 h-6" />
                    </div>
                    <span className="">{topic.name}</span>
                  </div>
                </Link>
              </li>
            )) || []}
          </ul>
        </div>

        {expandSettings && (
          <div className="px-4 w-full rounded-lg absolute bottom-28">
            <div className="px-3 w-full bg-neutral-800 rounded-lg">
              <Link href={`/`}>
                <button className="text-neutral-200 hover:text-neutral-400 flex gap-2 items-center py-3 w-full border-b border-gray-500">
                  <IoHomeOutline className=" text-2xl " />
                  <span className="text-sm">Home</span>
                </button>
              </Link>
              <Link href={`/profile`}>
                <button className="text-neutral-200 hover:text-neutral-400 flex gap-2 items-center py-3 w-full border-b border-gray-500">
                  <CiSettings className=" text-2xl " />
                  <span className="text-sm">Settings</span>
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="text-neutral-200 hover:text-neutral-400 flex gap-2 items-center py-3 w-full"
              >
                <TbLogout2 className="  text-2xl " />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* <div className="w-full flex justify-center p-6"> */}
        <div className="w-full px-4 pb-8">
          {/* <button
            onClick={handleLogout}
            className="w-full p-4 rounded-xl inline-flex justify-center items-center gap-x-2 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
          >
            <span>Logout</span>
            <RiLogoutCircleRLine />
          </button> */}
          {/* <button
            onClick={handleLogout}
            className="w-full p-4 rounded-xl inline-flex justify-center items-center gap-x-2 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
          >
            <span>Logout</span>
            <BsThreeDotsVertical />
          </button> */}

          <div
            onClick={() => setExpandSettings(!expandSettings)}
            className={`${
              expandSettings ? "bg-neutral-800" : "bg-[#040309] "
            } hover:bg-neutral-800 w-full px-3 py-3 cursor-pointer select-none rounded-lg inline-flex items-center gap-x-2 relative`}
          >
            {data?.profile?.profile_photo ? (
              <Image
                width={40}
                height={40}
                alt="User Logo"
                src={process.env.API_URL + data?.profile?.profile_photo}
                className="w-10 h-10 rounded-full object-cover object-center"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-daisy-bush-300">
                <div className="capitalize tracking-[-0.10rem] flex items-center justify-center w-full h-full text-xl font-bold text-neutral-800">
                  {fullName.charAt(0)}
                </div>
              </div>
            )}
            <div className="text-zinc-100 text-sm">
              {fullName ?? "Anonymous"}
            </div>

            <BsThreeDotsVertical className="text-neutral-200 absolute right-2" />
          </div>
        </div>
      </div>
    </nav>
  );
}
