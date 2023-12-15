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

type JobForm = {
  title: string;
  company: string;
  location: string;
  description: string;
  category: string;
  site: string;
  mode: string;
  logo: string;
};

interface Job extends JobForm {
  id: string;
  slug: string;
  numberOfViews: number;
  timeStamp: Date;
}

type BlogForm = {
  title: string;
  image: string;
  content: string;
  metaDescription: string;
  author: string;
  twitter?: string;
  portfolio?: string;
  linkedin?: string;
};

type Profession = {
  label: string;
};
