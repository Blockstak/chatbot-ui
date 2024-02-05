import Image from "next/image";
import Robot from "@/assets/icons/Robot";
import { useEffect, useState } from "react";

import { setShowSidebar } from "@/state/slices/uiSlice";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import {
  Source,
  FileResponse,
  updateChatContent,
  setCurrentSources,
} from "@/state/slices/chatSlice";

import { useProfileQuery } from "@/api/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { HiArrowRight, HiOutlinePlusCircle, HiXCircle } from "react-icons/hi";

interface ChatContentProps {
  id: string;
  botText: string;
  error?: boolean;
  userText: string;
  isStreaming?: boolean;
  sources: Source | null;
  files: FileResponse | null;
}

const ChatContent = ({
  id,
  files,
  botText,
  sources,
  userText,
  error = false,
  isStreaming = false,
}: ChatContentProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useProfileQuery();
  const { showSidebar } = useAppSelector((state) => state.ui);

  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [animatedText, setAnimatedText] = useState("");

  const fullName =
    data?.first_name !== "" && data?.last_name !== ""
      ? `${data?.first_name} ${data?.last_name}`
      : data.username;

  useEffect(() => {
    if (botText !== "Typing..." && isAnimating) {
      if (isStreaming) {
        const words = botText.split(" ");

        const interval = setInterval(() => {
          setAnimatedText((prev) => prev + " " + words[wordIndex]);
          setWordIndex((prev) => prev + 1);

          if (wordIndex === words.length - 1) {
            setIsAnimating(false); // Stop the animation
            clearInterval(interval);
            dispatch(
              updateChatContent({
                id,
                botText,
                isStreaming: false,
                files: files ?? null,
                sources: sources ?? null,
              })
            );
          }
        }, 100);

        return () => clearInterval(interval);
      } else {
        setIsAnimating(false);
        setAnimatedText(botText);
      }
    }
  }, [
    id,
    files,
    botText,
    sources,
    dispatch,
    wordIndex,
    isAnimating,
    isStreaming,
  ]);

  return (
    <>
      <div className="py-4 px-4 md:px-16 bg-surface-tertiary flex flex-col">
        <div className="max-w-6xl mx-auto mb-4 flex flex-wrap gap-x-2 w-full items-center">
          {files?.results.map((file, index) => (
            <div
              key={index}
              className={`rounded-full py-2 px-4 border-2 border-daisy-bush-500 flex gap-x-2`}
            >
              <span className="font-medium">
                {file?.file?.split("/")?.reverse()[0]?.split("_")?.join(" ")}
              </span>
              {/* <HiXCircle className="cursor-pointer text-neutral-200 w-6 h-6" /> */}
            </div>
          ))}

          {/* <HiOutlinePlusCircle className="cursor-pointer text-neutral-200 w-8 h-8" /> */}
        </div>

        <div className={`max-w-6xl mx-auto w-full flex gap-x-4  `}>
          <div className="w-10 h-10 bg-neutral-100 rounded-full">
            {data?.profile.profile_photo ? (
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
          </div>

          <div className={` flex flex-col gap-y-2 `}>
            <span>{userText}</span>
          </div>
        </div>
      </div>

      <div className={` py-4 px-4 md:px-16 flex flex-col gap-y-4  `}>
        <div className={`max-w-6xl mx-auto w-full flex gap-x-4  `}>
          <div className={`w-10 h-10`}>
            <Robot className="w-full h-full" color="#A4A4FD" />
          </div>

          <div
            className={`relative w-full flex flex-col gap-y-2 ${
              error && `text-red-500`
            }`}
          >
            {botText === "Typing..." ? (
              <div className="w-min absolute top-4 left-4">
                <div className="dot-flashing" />
              </div>
            ) : (
              <pre className="whitespace-pre-wrap text-base font-poppins">
                {!isStreaming ? botText : animatedText}
              </pre>
            )}

            <button
              onClick={() => {
                dispatch(
                  setCurrentSources({
                    id,
                    userText,
                    ...((sources as Pick<
                      Source,
                      "page_numbers" | "source_urls" | "text_contents"
                    >) ?? null),
                  })
                );

                dispatch(setShowSidebar(!showSidebar));
              }}
              className="transition-colors duration-200 ease-in-out ml-auto w-min border border-daisy-bush-200 text-daisy-bush-200 rounded text-sm whitespace-nowrap px-4 py-3 font-medium hover:border-daisy-bush-400 hover:bg-daisy-bush-400 hover:text-white"
            >
              <span>View Sources</span>
              <HiArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatContent;

{
  /* <AlertDialog.Root open={open} onOpenChange={setOpen}>
  <AlertDialog.Portal>
    <AlertDialog.Overlay className="bg-[#1F2937] [state=open]:animate-overlayShow opacity-40 fixed inset-0 z-[1001]" />
    <AlertDialog.Content className="[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-[#202020] p-12 focus:outline-none z-[1002] text-neutral-200">
      <AlertDialog.Title className="font-bold text-center text-2xl mb-4">
        Are you sure you want to permanently delete this data?
      </AlertDialog.Title>

      <p className="text-center block my-4">
        Once completed, this action cannot be reverted.
      </p>

      <div className="flex justify-center gap-[25px]">
        <AlertDialog.Cancel asChild>
          <button className=" border-2 border-neutral-300 hover:border-neutral-400 inline-flex items-center justify-center rounded px-12 py-3 font-medium leading-none outline-none">
            Cancel
          </button>
        </AlertDialog.Cancel>
        <AlertDialog.Action asChild>
          <button
            onClick={() => console.log("delete")}
            className="text-[#1F2937] bg-daisy-bush-300 hover:bg-daisy-bush-400 inline-flex items-center justify-center rounded px-12 py-3 font-medium leading-none outline-none"
          >
            Delete
          </button>
        </AlertDialog.Action>
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>; */
}
