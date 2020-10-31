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

export type Teacher = {};

export type Student = {};

export type Question = {};

export type Comment = {};
