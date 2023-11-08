import { AiOutlineClose } from "react-icons/ai";
import { Sources } from "../Chat/ChatSpace/Sources";
import { AnimatePresence, motion } from "framer-motion";
import { setShowSidebar } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const links = [
  { name: "Home", to: "#", id: 1 },
  { name: "About", to: "#", id: 2 },
  { name: "Blog", to: "#", id: 3 },
  { name: "Contact", to: "#", id: 4 },
];

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.ui);

  return (
    <AnimatePresence>
      {showSidebar && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{
            x: 0,
          }}
          exit={{
            x: "100%",
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed bg-neutral-900 top-0 right-0 text-daisy-bush-50 w-full max-w-sm h-screen"
        >
          <div className="flex justify-between items-center border-b border-neutral-200 px-4 py-6">
            <h2 className="text-xl font-medium">Sources</h2>

            <AiOutlineClose
              className="h-8 w-8 mb-2 cursor-pointer"
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
            />
          </div>

          {/* {links.map(({ name, to, id }) => (
            <motion.a key={id} href={to}>
              {name}
            </motion.a>
          ))} */}
          <Sources />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
