import classNames from "classnames";
import { forwardRef, useMemo } from "react";
import { HiChevronDown } from "react-icons/hi";
import { useAppSelector } from "@/hooks/useStoreTypes";
import * as Accordion from "@radix-ui/react-accordion";

export const Sources = () => {
  const sources = useAppSelector((state) => state.chat.currentSources);

  const sourcesList = useMemo(() => {
    return sources?.page_numbers?.map((page, index) => {
      const url = sources.source_urls[index].replaceAll("\\", "/").split("/");
      const serializedUrl = url
        .slice(
          url.findIndex((item) => item === "media"),
          url.length
        )
        .join("/");

      return {
        url: serializedUrl,
        id: index.toString(),
        title: sources.userText,
        page: (page + 1).toString(),
        excerpt: sources.text_contents[index].replaceAll("●", ""),
      };
    });
  }, [sources]);

  return (
    <Accordion.Root collapsible type="single" className="px-4">
      {sourcesList
        ?.filter((item) => item.excerpt !== "")
        .map((item, index) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>
              <div className="flex flex-col text-left">
                <h2 className="text-base mb-1">Source {index + 1}</h2>

                <span className="text-sm rounded-full py-1 px-2 border-2 border-daisy-bush-500">
                  {item.url.split("/")?.reverse()[0]?.split("_")?.join(" ")}
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex flex-col gap-y-2">
                <div className="flex gap-2 mt-2">
                  <span className="font-medium">Page:</span>
                  <span>{item.page}</span>
                </div>
              </div>
              <pre className="mt-4 font-poppins whitespace-pre-wrap">
                {item.excerpt}
              </pre>
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion.Root>
  );
};

const AccordionItem = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Accordion.Item>
>(function AccordionItem({ children, className, ...props }, forwardedRef) {
  return (
    <Accordion.Item
      {...props}
      ref={forwardedRef}
      className={classNames(
        "overflow-hidden first:mt-0 py-4 border-b",
        className
      )}
    >
      {children}
    </Accordion.Item>
  );
});

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Accordion.Trigger>
>(function AccordionTrigger({ children, className, ...props }, forwardedRef) {
  return (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        {...props}
        ref={forwardedRef}
        className={classNames(
          "group flex flex-1 items-center justify-between font-medium",
          className
        )}
      >
        {children}
        <HiChevronDown
          className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  );
});

const AccordionContent = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Accordion.Content>
>(function AccordionContent({ children, className, ...props }, forwardedRef) {
  return (
    <Accordion.Content
      className={classNames(
        "data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div>{children}</div>
    </Accordion.Content>
  );
});
