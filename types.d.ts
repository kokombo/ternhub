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
  logo: string;
  salary?: number;
  email?: string;
};

interface JobType extends JobFormType {
  id: string;
  slug: string;
  numberOfViews: number;
  timeStamp: Date;
  description: string;
}

type BlogFormType = {
  title: string;
  image: string;
  metaDescription: string;
  category: string;
  author: string;
  twitter?: string;
  portfolio?: string;
  linkedin?: string;
};

interface BlogType extends BlogFormType {
  id: string;
  slug: string;
  numberOfViews: number;
  timeStamp: Date;
  content: string;
}

type Profession = {
  label: string;
};

type FaqFormType = {
  question: string;
};

interface FaqType extends FaqFormType {
  id: string;
  answer: string;
}

type Error = {
  message: string;
};

type RadioOption = {
  value: string;
  label: string;
};
