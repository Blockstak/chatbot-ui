import Image from "next/image";
import { useState } from "react";
import Robot from "@/assets/icons/Robot";
import { setShowSidebar } from "@/state/slices/uiSlice";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { HiArrowRight, HiOutlinePlusCircle, HiXCircle } from "react-icons/hi";

interface ChatContentProps {
  type?: "user" | "bot";
}

const ChatContent = ({ type = "bot" }: ChatContentProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { showSidebar } = useAppSelector((state) => state.ui);

  return (
    <div
      className={`py-4 px-4 md:px-16 ${
        type === "user" && "bg-neutral-900"
      } flex flex-col gap-y-4`}
    >
      {type === "user" && (
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
      )}

      <div className={`flex gap-x-4`}>
        <div
          className={`w-10 h-10 ${
            type === "user" && `bg-neutral-100 rounded-full`
          }`}
        >
          {type === "user" ? (
            <Image
              alt=""
              width={500}
              height={500}
              src="/doggo.png"
              className="rounded-full object-cover object-center w-full h-full"
            />
          ) : (
            <Robot className="w-full h-full" color="#A4A4FD" />
          )}
        </div>

        <div
          className={`w-full flex flex-col gap-y-2 ${
            type === "user" && `-mt-1`
          }`}
        >
          <p className="w-full font-medium text-lg">
            Lorem ipsum dolor sit amet consectetur. Fermentum risus sit sagittis
            amet mi pharetra nisl eget elit. Quam sodales nec fames amet
            pellentesque sed eget. Lobortis non tempus fringilla tincidunt.
            Mauris rhoncus volutpat egestas blandit. Ullamcorper mattis congue
            tempor amet faucibus odio. Ante eu cursus mauris lorem adipiscing
            suspendisse ut adipiscing. Aliquet sed nulla pellentesque mattis.
          </p>

          {type === "bot" && (
            <button
              onClick={() => {
                dispatch(setShowSidebar(!showSidebar));
                // setOpen(!open);
              }}
              className="ml-auto w-min border border-daisy-bush-200 text-daisy-bush-200 rounded text-sm whitespace-nowrap px-4 py-3 font-medium"
            >
              <span>View Sources</span>
              <HiArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
          )}

          <AlertDialog.Root open={open} onOpenChange={setOpen}>
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
          </AlertDialog.Root>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
