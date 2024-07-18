import { forwardRef, type InputHTMLAttributes, type Ref } from "react";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
  (props, ref: Ref<HTMLInputElement>) => {
    return <input {...props} ref={ref} className="" />;
  }
);
MyInput.displayName = "MyInput";

export default MyInput;

export const TestComponent = () => {
  return <MyInput type="text" />;
};
