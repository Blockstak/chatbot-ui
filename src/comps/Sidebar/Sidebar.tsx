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
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

import Link from "next/link";
import { useRef, useState } from "react";
import { logout } from "@/state/slices/authSlice";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { usePostTopicsMutation } from "@/api/chatbot/topics";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const navItems = [
  {
    label: "Dashboard",
    icon: <HiOutlineHome className="text-neutral-200 w-6 h-6" />,
    href: "/",
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
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [postTopics, result] = usePostTopicsMutation();
  const [inputVisible, setInputVisible] = useState(false);
  const { topics } = useAppSelector((state) => state.topic);
  const [topicList, setTopicList] = useState(topics?.results || []);

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
    <nav className="hidden md:flex md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row bg-neutral-950 md:w-[20rem]">
      <nav className="h-full bg-neutral-800">
        <ul className="flex flex-col list-none gap-y-4 mt-6">
          {navItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <li className="p-3 cursor-pointer">{item.icon}</li>
            </Link>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col flex-wrap">
        <div className="flex flex-col items-center relative mt-4 overflow-y-auto flex-1 p-4">
          <div
            onClick={() => handlePlusClick()}
            className={`${
              !inputVisible &&
              `cursor-pointer text-neutral-200 hover:text-neutral-300`
            } flex items-center mb-4 w-full border-2 p-3 rounded-lg`}
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

          <div className="relative flex flex-wrap items-center">
            <input
              placeholder="Search"
              onChange={filterTopics}
              className="w-full border-2 p-3 rounded-lg focus:outline-none bg-transparent text-neutral-200 placeholder-neutral-200"
            />
            <HiSearch className="text-neutral-200 inline-flex h-full absolute right-2 items-center justify-center w-8 pl-2 py-2" />
          </div>

          <ul className="md:flex-col md:min-w-full flex flex-col list-none mt-4">
            {topicList?.map((topic) => (
              <li key={topic.id}>
                <Link
                  href={`/topic/${topic.id}`}
                  className={`${
                    id === topic.id.toString() && `bg-neutral-800`
                  } p-2 rounded-lg text-neutral-200 text-sm my-1 font-medium flex justify-between items-center`}
                >
                  <span className="flex items-center gap-x-2 hover:text-neutral-300">
                    <HiOutlineChatBubbleOvalLeftEllipsis className="w-6 h-6" />
                    <span className="">{topic.name}</span>
                  </span>
                </Link>
              </li>
            )) || []}
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
