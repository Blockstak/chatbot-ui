import Image from "next/image";
import Robot from "@/assets/icons/Robot";

interface ChatContentProps {
  type?: "user" | "bot";
}

const ChatContent = ({ type = "bot" }: ChatContentProps) => {
  return (
    <div
      className={`py-4 px-4 md:px-16 ${
        type === "user" && "bg-neutral-900"
      } flex items-center gap-x-4`}
    >
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
            className="rounded-full object-cover object-center aspect-square w-full h-full"
          />
        ) : (
          <Robot className="w-full h-full" color="#A4A4FD" />
        )}
      </div>
      <p className="mt-1 block w-full">
        Lorem ipsum dolor sit amet consectetur. Fermentum risus sit sagittis
        amet mi pharetra nisl eget elit. Quam sodales nec fames amet
        pellentesque sed eget. Lobortis non tempus fringilla tincidunt. Mauris
        rhoncus volutpat egestas blandit. Ullamcorper mattis congue tempor amet
        faucibus odio. Ante eu cursus mauris lorem adipiscing suspendisse ut
        adipiscing. Aliquet sed nulla pellentesque mattis.
      </p>
    </div>
  );
};

export default ChatContent;
