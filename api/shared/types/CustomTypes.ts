export type User = {
  user_number: string;
  name: string;
  class: string[];
  email: string;
  mobile: string;
  password: string;
  role: "student" | "teacher";
};

export type Class = {
  class_code: string;
  subject_name: string;
  faculty: string;
};

export type Question = {
  question_id: string;
  asked_by: User;
  title: string;
  body: string;
  class_code: string;
  details: {
    unit_number: string;
    unit_name: string;
    sub_topic: string;
  };
  tags: string[];
  comments: {
    comment_id: string;
    asked_by: User;
    body: string;
    upvotes: number;
    downvotes: number;
    answered: boolean;
    teacher_choice: boolean;
    timestamp: Date;
  }[];
  upvotes: number;
  downvotes: number;
  answered: boolean;
  teacher_choice: boolean;
  timestamp: number;
};
