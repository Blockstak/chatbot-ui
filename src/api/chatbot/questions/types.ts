export type PostQuestionResponse = {
  id: number;
  text: string;
  category: number;
};

export type QuestionResponse = {
  count: number;
  next: string;
  previous: string;
  results?: PostQuestionResponse[];
};

export type QuestionFormData = {
  name: string;
  user: number;
};
