import { forwardRef, useMemo } from "react";
import classNames from "classnames";
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
        page: page.toString(),
        title: sources.userText,
        excerpt: sources.text_contents[index].replaceAll("●", ""),
      };
    });
  }, [sources]);

  return (
    <Accordion.Root collapsible type="single" className="p-4">
      {sourcesList
        ?.filter((item) => item.excerpt !== "")
        .map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="mb-1">
              <div className="flex flex-col text-left">
                <h2 className=" text-lg">{item.title}</h2>
                <span>
                  <a
                    href={`${process.env.API_URL}/${item.url}`}
                    target="_blank"
                    className="hover:text-daisy-bush-400 underline"
                  >
                    Source Url
                  </a>
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
