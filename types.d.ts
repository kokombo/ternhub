declare module "node-email-verifier";
declare module "react-quill";

type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

type UserLoginDataType = {
  email: string;
  password: string;
};

interface UserSignupDataType extends UserLoginDataType {
  profession: string;
  name: string;
}

type Error = {
  message: string;
};

type JobFormType = {
  title: string;
  company: string;
  location: string;
  category: string;
  site?: string;
  mode: string;
  logo?: string;
  salary?: number;
  email?: string;
  slug: string;
  type: string;
};

interface JobData extends JobFormType {
  description: string;
}

interface JobType extends JobFormType {
  _id: string;
  numberOfViews: number;
  createdAt: Date;
  description: string;
}

type BlogFormType = {
  title: string;
  image: string;
  metaDescription: string;
  category: string;
  author: {
    name: string;
    twitter?: string;
    portfolio?: string;
    linkedin?: string;
  };
};

interface BlogData extends BlogFormType {
  content: string;
}

interface BlogType extends BlogFormType {
  _id: string;
  slug: string;
  numberOfViews: number;
  createdAt: Date;
  content: string;
}

type Profession = {
  label: string;
};

type FaqFormType = {
  question: string;
};

interface FaqData extends FaqFormType {
  answer: string;
}

interface FaqType extends FaqFormType {
  _id: string;
  answer: string;
}
type RadioOption = {
  value: string;
  label: string;
};

type ImageInfo = {
  originalName: string;
  buffer: Buffer;
};

type EmailInfoType = {
  from: string;
  to: string | string[];
  subject: string;
  text: string;
  html: string;
};

type ErrorResponse = {
  message: string;
};

type MessageResponse = {
  message: string;
};

type JobsResponse = {
  jobs: JobType[];
  numOfJobsAfterQuery: number;
  totalJobsCountBeforePagination: number;
};

type QueryTerms = {
  jobModeFilterTerm: string;
  jobTypeFilterTerm: string;
  pageNumber: number;
  jobCategoryFilterTerm: string;
  limit: number;
  searchTerm: string;
};
