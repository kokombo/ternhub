"use client";
import { Field, ErrorMessage } from "formik";
import { useOutline } from "@/utilities/hooks";

type Props = {
  label: string;
  name: string;
  type: string;
  id: string;
};

const InputField = (props: Props) => {
  const { outline, showOutline, closeOutline } = useOutline();

  return (
    <div className="flex flex-col items-start gap-3 ">
      <label
        htmlFor={props.name}
        className={`${
          outline ? "text-purple" : "text-textblack"
        } lg:text-lg text-base`}
      >
        {props.label}
      </label>

      <div
        onMouseEnter={showOutline}
        onMouseLeave={closeOutline}
        className={`${
          outline ? "border-purple" : "border-gray"
        } w-full rounded-[5px] border-[1px]`}
      >
        <Field
          type={props.type}
          name={props.name}
          id={props.id}
          className="input"
        />
      </div>

      <ErrorMessage
        name={props.name}
        component="p"
        className="text-red text-base absolute bottom-0"
      />
    </div>
  );
};

export default InputField;
