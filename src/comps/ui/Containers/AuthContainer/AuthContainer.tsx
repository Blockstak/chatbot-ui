import React from "react";
import Image from "next/image";

const AuthContainer = ({
  authText,
  children,
  authSubText,
  maxWidth = "6xl",
}: {
  maxWidth?: "xl" | "6xl";
  authText: string;
  authSubText?: string;
  children: React.ReactNode;
}) => {
  return (
    <section
      className={`flex flex-col items-center justify-center bg-[#272727] min-h-screen`}
    >
      <div
        className={`${
          maxWidth === "xl" ? `max-w-xl` : `max-w-6xl`
        } py-4 md:py-12 mx-auto`}
      >
        <div className="flex flex-col w-full mb-2 px-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-neutral-200">
            {authText}
          </h1>
        </div>
        <div className="w-full mx-auto">
          <div className="flex flex-wrap">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default AuthContainer;
