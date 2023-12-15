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

type Job = {
  id: string;
  title: string;
  slug: string;
  location: string;
  company: string;
  category: string;
  content: string;
  site: string;
  mode: string;
  logo: string;
  keywords: array;
  numberOfViews: number;
  timeStamp: Date;
};
