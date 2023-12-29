type File = {
  id: number;
  file: string;
  topic: number;
  topic_name: string;
  uploaded_at: Date | string;
};

export type UploadFileResponse = {
  count: number;
  results: File[];
  next: string | number | null;
  previous: string | number | null;
};

export type UploadFileFormData = any;
