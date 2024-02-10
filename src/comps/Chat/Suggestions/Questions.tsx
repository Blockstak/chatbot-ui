import { v4 as uuidv4 } from "uuid";
import { useGetQuestionsQuery } from "@/api/chatbot/questions";
import React, { useState } from "react";

import { useAppDispatch } from "@/hooks/useStoreTypes";
import { addChatContent, updateChatContent } from "@/state/slices/chatSlice";
import { useRouter } from "next/router";
import { useGetFilesByTopicIdQuery } from "@/api/chatbot/files";
import { useLazyChatQuery } from "@/api/chatbot/chat";

const Questions = ({ viewAll }: { viewAll: boolean }) => {
  const router = useRouter();
  const { data: questions, isLoading } = useGetQuestionsQuery();

  const dispatch = useAppDispatch();

  const [chat, chatResult] = useLazyChatQuery();
  const topicId = router.query.id as unknown as number;
  const { data } = useGetFilesByTopicIdQuery(topicId as unknown as string);
  const [fetchingChatResponse, setFetchingChatResponse] = useState(false);

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

  return (
    <div className="">
      {viewAll ? (
        <div className="grid grid-cols-2 items-center gap-5 mt-6">
          {questions?.results?.map((question, index) => (
            <button
              onClick={() => initiateChat(question.text)}
              key={index}
              className="text-sm font-medium p-4  border border-neutral-300 rounded-l-xl rounded-tr-xl "
            >
              {question.text}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-5 mt-6 flex-wrap">
          {questions?.results?.slice(0, 5).map((question, index) => (
            <div
              key={index}
              className="text-sm font-medium p-3 border border-daisy-bush-300 rounded-l-xl rounded-tr-xl"
            >
              {question.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Questions;
