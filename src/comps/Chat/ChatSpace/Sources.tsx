import { forwardRef } from "react";
import classNames from "classnames";
import { HiChevronDown } from "react-icons/hi";
import * as Accordion from "@radix-ui/react-accordion";

const data = [
  {
    id: "1",
    title: "Is it accessible?",

    url: "www.newage.org",

    metadata: {
      page: "236",
      journal: "236",
      doi: "10.1145/2",
      date: "2013-01-01",
    },

    exerpt:
      "Fermentum risus sit sagittis amet mi pharetra nisl eget elit. Quam sodales nec fames amet pellente sed eget. Lobortis non tempus fringilla tincidunt. Mauris rhoncus volutpat egestas blandit. Ullam mattis congue tempor amet faucibus odio.",
  },
  {
    id: "2",
    title: "Is it accessible?",
    url: "www.newage.org",
    metadata: {
      page: "236",
      journal: "236",
      doi: "10.1145/2",
      date: "2013-01-01",
    },

    exerpt:
      "Fermentum risus sit sagittis amet mi pharetra nisl eget elit. Quam sodales nec fames amet pellente sed eget. Lobortis non tempus fringilla tincidunt. Mauris rhoncus volutpat egestas blandit. Ullam mattis congue tempor amet faucibus odio.",
  },
  {
    id: "3",
    title: "Is it accessible?",

    url: "www.newage.org",

    metadata: {
      page: "236",
      journal: "236",
      doi: "10.1145/2",
      date: "2013-01-01",
    },

    exerpt:
      "Fermentum risus sit sagittis amet mi pharetra nisl eget elit. Quam sodales nec fames amet pellente sed eget. Lobortis non tempus fringilla tincidunt. Mauris rhoncus volutpat egestas blandit. Ullam mattis congue tempor amet faucibus odio.",
  },
  {
    id: "4",
    title: "Is it accessible?",

    url: "www.newage.org",

    metadata: {
      page: "236",
      journal: "236",
      doi: "10.1145/2",
      date: "2013-01-01",
    },

    exerpt:
      "Fermentum risus sit sagittis amet mi pharetra nisl eget elit. Quam sodales nec fames amet pellente sed eget. Lobortis non tempus fringilla tincidunt. Mauris rhoncus volutpat egestas blandit. Ullam mattis congue tempor amet faucibus odio.",
  },
  {
    id: "5",
    title: "Is it accessible?",

    url: "www.newage.org",

    metadata: {
      page: "236",
      journal: "236",
      doi: "10.1145/2",
      date: "2013-01-01",
    },

    exerpt:
      "Fermentum risus sit sagittis amet mi pharetra nisl eget elit. Quam sodales nec fames amet pellente sed eget. Lobortis non tempus fringilla tincidunt. Mauris rhoncus volutpat egestas blandit. Ullam mattis congue tempor amet faucibus odio.",
  },
];

export const Sources = () => (
  <Accordion.Root collapsible type="single" className="p-4">
    {data.map((item) => (
      <AccordionItem key={item.id} value={item.id}>
        <AccordionTrigger className="mb-1">
          <div>
            <h2 className="text-lg">{item.title}</h2>
            <a href={item.url} className="hover:text-daisy-bush-400">
              {item.url}
            </a>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-2">
              {Object.keys(item.metadata).map((key) => {
                return (
                  <div
                    key={key}
                    className="flex flex-col gap-y-1 justify-center w-full"
                  >
                    <span className="capitalize">{key}</span>
                    <span>
                      {item.metadata[key as keyof typeof item.metadata]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-4">{item.exerpt}</p>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion.Root>
);

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
