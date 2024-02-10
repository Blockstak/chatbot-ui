import ChatInput from "./ChatInput";
import ChatSpace from "./ChatSpace";
import Suggestions from "./Suggestions";
import { useLayoutEffect, useRef, useState } from "react";
import { HiOutlineBolt } from "react-icons/hi2";
import { IoIosArrowRoundForward } from "react-icons/io";

import { useGetCategoriesQuery } from "@/api/chatbot/categories";

import Questions from "./Suggestions/Questions";
import Categories from "./Suggestions/Categories";
import { useRouter } from "next/router";
import { useGetFilesByTopicIdQuery } from "@/api/chatbot/files";

const Chat = () => {
  const textbox = useRef<HTMLTextAreaElement | null>(null);

  function adjustHeight() {
    if (textbox?.current) {
      textbox.current.style.height = "inherit";
      textbox.current.style.height = `${textbox.current.scrollHeight}px`;
    }
  }

  useLayoutEffect(adjustHeight, []);

  const router = useRouter();
  const [skip, setSkip] = useState(false);
  const topicId = router.query.id as unknown as number;
  // const { data } = useGetFilesByTopicIdQuery(topicId as unknown as string);
  const { data, isLoading } = useGetFilesByTopicIdQuery(
    topicId as unknown as string
  );
  // endpointName
  // error
  // propel
  // fulfilledTimeStamp
  // isError
  // isFetching
  // isLoading
  // issuccess
  // isUninitia1ized
  // originalArgs
  // refetch
  console.log("data----------", data);
  return (
    <div className="text-neutral-200 w-full custom-container-2 flex flex-col justify-between relative ">
      {!isLoading && data?.results?.length !== 0 && <Categories />}

      <div className="">
        <ChatSpace />
      </div>

      {/* <div className="p-4 sticky bottom-0 bg-neutral-800"> */}
      <div className="p-4 sticky bottom-0  rounded-3xl">
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
