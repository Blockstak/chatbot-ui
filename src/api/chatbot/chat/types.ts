export type ChatResponse = {
  response_message: string;
  response_source: {
    source_urls: string[];
    page_numbers: number[];
    text_contents: string[];
  };
};

export type ChatRequest = {
  message: string;
  topicId: number;
};
