import { useGetCategoriesQuery } from "@/api/chatbot/categories";
import { useGetQuestionsQuery } from "@/api/chatbot/questions";
import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { HiOutlineBolt } from "react-icons/hi2";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import Questions from "./Questions";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { useLazyChatQuery } from "@/api/chatbot/chat";
import { useRouter } from "next/router";
import { useGetFilesByTopicIdQuery } from "@/api/chatbot/files";
import { v4 as uuidv4 } from "uuid";
import { addChatContent, updateChatContent } from "@/state/slices/chatSlice";
import { setViewSuggestions } from "@/state/slices/uiSlice";
import { RiArrowRightLine, RiLoader4Fill } from "react-icons/ri";
import Button from "@/comps/ui/Button";
import {
  QuestionResponse,
  PostQuestionResponse,
} from "@/api/chatbot/questions/types";

const Categories = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [skip, setSkip] = useState<boolean>(false);

  const { data: categories, isLoading: loadingCategories } =
    useGetCategoriesQuery();

  const { data: questions, isLoading: loadingQuestions } =
    useGetQuestionsQuery();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [chat, chatResult] = useLazyChatQuery();
  const topicId = router.query.id as unknown as number;
  const { data } = useGetFilesByTopicIdQuery(topicId as unknown as string);
  const [fetchingChatResponse, setFetchingChatResponse] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const { viewSuggestions } = useAppSelector((state) => state.ui);

  const [displayQuestions, setDisplayQuestions] = useState<QuestionResponse>();

  const initiateChat = async (question?: string) => {
    const message = question ? question : "";

    // setFiles([]);

    const chatId = uuidv4();

    dispatch(
      addChatContent({
        id: chatId,
        sources: null,
        userText: message,
        isStreaming: true,
        botText: "Typing...",
        topic: Number(topicId),
        files: data ? data : null,
      })
    );

    try {
      setFetchingChatResponse(true);
      const res = await chat({
        message: message,
        topicId,
      }).unwrap();

      if (res) {
        dispatch(
          updateChatContent({
            id: chatId,
            isStreaming: true,
            files: data ? data : null,
            sources: res.response_source,
            botText: res.response_message,
          })
        );

        setFetchingChatResponse(false);
      }
    } catch (error) {
      dispatch(
        updateChatContent({
          id: chatId,
          sources: null,
          files: data ? data : null,
          botText: "Failed to fetch response. Try again",
        })
      );

      setFetchingChatResponse(false);
    }
    // }
  };

  useEffect(() => {
    console.log("questions--", questions);

    setDisplayQuestions(questions);
  }, [questions]);

  const filterQuestions = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveCategory(0);
    const query = event.target.value.toLowerCase();
    console.log("query--", query);

    if (query !== "") {
      const filteredItems = questions?.results?.filter((question) =>
        question.text.toLowerCase().includes(query)
      );

      const filteredQuestions = {
        ...displayQuestions,
        results: filteredItems ? filteredItems : [],
      };

      setDisplayQuestions(filteredQuestions as QuestionResponse);
    } else {
      setDisplayQuestions(questions);
    }
  };

  const filterCategory = (id: number) => {
    const inputElement = document.getElementById(
      "questionSearch"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }

    setActiveCategory(id);
    if (id !== 0) {
      const filteredItems = questions?.results?.filter(
        (question) => question.category === id
      );

      const filteredQuestions = {
        ...displayQuestions,
        results: filteredItems ? filteredItems : [],
      };
      setDisplayQuestions(filteredQuestions as QuestionResponse);
    } else {
      setDisplayQuestions(questions);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full ">
      {viewSuggestions && (
        <button
          onClick={() => dispatch(setViewSuggestions(!viewSuggestions))}
          className=" my-5 bg-surface-secondary text-daisy-bush-200 p-3 rounded-md text-sm flex items-center gap-2"
        >
          <IoIosArrowRoundBack className="h-5 w-5" />
          Go Back
        </button>
      )}

      <div className="bg-surface-secondary p-6 rounded-lg my-5 ">
        <div
          className={`${
            viewSuggestions
              ? ""
              : "p-5 border border-daisy-bush-300 rounded-lg group"
          }  overflow-hidden `}
        >
          {categories && (
            <div className="flex items-center justify-between ">
              <div className=" flex items-center gap-2">
                <HiOutlineBolt
                  className={`${viewSuggestions ? "h-7 w-7" : "h-5 w-5"} `}
                />
                <p className={`${viewSuggestions ? "text-xl" : "text-base"} `}>
                  Suggested Questions for you
                </p>
              </div>

              <div className="">
                {viewSuggestions ? (
                  <div className="relative flex flex-wrap items-center">
                    <input
                      id="questionSearch"
                      placeholder="Search"
                      onChange={filterQuestions}
                      className="w-full border border-neutral-400 py-3 pl-3 pr-8 rounded-lg focus:outline-none bg-transparent text-neutral-200 placeholder-neutral-400"
                    />
                    <HiSearch className="text-neutral-400 inline-flex h-full absolute right-2 items-center justify-center w-8 pl-2 py-2" />
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      dispatch(setViewSuggestions(!viewSuggestions))
                    }
                    className="bg-daisy-bush-700 p-3 rounded-md text-sm flex items-center gap-2"
                  >
                    View all
                    <IoIosArrowRoundForward className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {viewSuggestions && (
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <button
                onClick={() => filterCategory(0)}
                className={`${
                  activeCategory === 0 ? "bg-daisy-bush-600" : "bg-transparent"
                } text-sm font-medium px-6 py-3 border border-daisy-bush-600 rounded-full`}
              >
                All
              </button>

              {categories?.results.map((category, index) => (
                <button
                  onClick={() => filterCategory(category.id)}
                  key={index}
                  className={`${
                    activeCategory === category.id
                      ? "bg-daisy-bush-600"
                      : "bg-transparent"
                  } text-sm font-medium px-4 py-3 border border-daisy-bush-600 rounded-full`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}

          <div className="">
            {viewSuggestions ? (
              <div className="grid grid-cols-2 items-center gap-5 mt-6">
                {displayQuestions?.results?.map((question, index) => (
                  <button
                    onClick={() => {
                      initiateChat(question.text);
                      dispatch(setViewSuggestions(!viewSuggestions));
                    }}
                    key={index}
                    className="group hover:bg-neutral-900 text-sm text-left p-4 border border-neutral-300 rounded-l-xl rounded-tr-xl flex items-center justify-between duration-200 gap-1.5 "
                  >
                    <p>{question.text}</p>
                    <p className="group-hover:opacity-100 opacity-0 bg-surface-secondary p-2 w-fit text-xl rounded-md text-center ">
                      <RiArrowRightLine />
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="group-hover:max-h-[500px] group-hover:mt-6 max-h-0 group-hover:opacity-100 opacity-0 duration-300">
                <div className="flex flex-wrap gap-5">
                  {questions?.results?.slice(0, 5).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => initiateChat(question.text)}
                      className=" text-sm font-medium p-3 border border-daisy-bush-300 rounded-l-xl rounded-tr-xl"
                    >
                      {question.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* <button
              onClick={handleMoreQuestions}
              className="bg-daisy-bush-600 w-28 px-3 py-2 relative rounded"
              disabled={loadingQuestions}
            >
              {!loadingQuestions ? (
                <RiLoader4Fill className="inline-flex animate-spin h-5 w-5 ml-2" />
              ) : (
                "view more"
              )}
             
            </button> */}
          </div>

          {/* <Questions viewAll={viewAll} /> */}
        </div>
      </div>
    </div>
  );
};

export default Categories;
