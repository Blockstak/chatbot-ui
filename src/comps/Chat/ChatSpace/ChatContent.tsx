import Image from "next/image";
import { useEffect, useState } from "react";
import Robot from "@/assets/icons/Robot";
import { setShowSidebar } from "@/state/slices/uiSlice";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { updateChatContent } from "@/state/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { HiArrowRight, HiOutlinePlusCircle, HiXCircle } from "react-icons/hi";

interface ChatContentProps {
  id: string;
  botText: string;
  error?: boolean;
  userText: string;
  isStreaming?: boolean;
}

const ChatContent = ({
  id,
  botText,
  userText,
  error = false,
  isStreaming = false,
}: ChatContentProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { showSidebar } = useAppSelector((state) => state.ui);

  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [animatedText, setAnimatedText] = useState("");

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
            dispatch(updateChatContent({ id, isStreaming: false, botText }));
          }
        }, 100);

        return () => clearInterval(interval);
      } else {
        setIsAnimating(false);
        setAnimatedText(botText);
      }
    }
  }, [wordIndex, isAnimating, botText, isStreaming, dispatch, id]);

  return (
    <>
      <div
        className={`py-4 px-4 md:px-16 bg-neutral-900 flex flex-col gap-y-4`}
      >
        <div className={`flex items-center gap-x-4`}>
          <div
            className={`w-10 h-10  bg-neutral-100 rounded-full
            `}
          >
            <Image
              alt=""
              width={500}
              height={500}
              src="/doggo.png"
              className="rounded-full object-cover object-center w-full h-full"
            />
          </div>

          <div className={`w-full flex flex-col gap-y-2 -mt-1`}>
            <span>{userText}</span>
          </div>
        </div>
      </div>

      <div className={`py-4 px-4 md:px-16 flex flex-col gap-y-4`}>
        <div className={`flex items-center gap-x-4`}>
          <div className={`w-10 h-10`}>
            <Robot className="w-full h-full" color="#A4A4FD" />
          </div>

          <div
            className={`w-full flex flex-col gap-y-2 ${
              error && `text-red-500`
            }`}
          >
            <pre className="whitespace-pre-wrap text-base font-poppins">
              {botText === "Typing..." || !isStreaming ? botText : animatedText}
            </pre>

            <button
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
              className="ml-auto w-min border border-daisy-bush-200 text-daisy-bush-200 rounded text-sm whitespace-nowrap px-4 py-3 font-medium"
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

{
  /* {type === "user" && (
        <div className="mb-4 flex flex-wrap gap-x-2 gap-y-4 w-full items-center">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`rounded-full py-2 px-4 border-2 border-daisy-bush-500 flex gap-x-2`}
            >
              <span className="font-medium">licenseCo-Agre....</span>
              <HiXCircle className="cursor-pointer text-neutral-200 w-6 h-6" />
            </div>
          ))}

          <HiOutlinePlusCircle className="cursor-pointer text-neutral-200 w-8 h-8" />
        </div>
      )} */
}
