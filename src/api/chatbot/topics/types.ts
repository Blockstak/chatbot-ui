export type PostTopicResponse = {
  id: number;
  name: string;
  user: number;
};

export type TopicResponse = {
  next: string;
  count: number;
  previous: string;
  results: PostTopicResponse[];
};

export type TopicFormData = {
  name: string;
  user: number;
};
