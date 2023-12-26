import { Field, ErrorMessage, FieldProps } from "formik";
import { useOutline } from "@/utilities/hooks";
import Image from "next/image";
import { icons } from "@/constants";

type Props = {
  label: string;
  name: string;
  type: string;
  id: string;
  maxLength?: number;
  placeholder?: string;
  togglePasswordIcon?: () => void;
  setPasswordVisibile?: boolean;
  passwordField?: boolean;
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

      <div className="relative w-full">
        <div
          onMouseEnter={showOutline}
          onMouseLeave={closeOutline}
          className={`${
            outline ? "border-purple" : "border-gray"
          } rounded-[5px] border-[1px]`}
        >
          <Field name={props.name} id={props.id}>
            {({ field, form, meta }: FieldProps) => {
              return (
                <input
                  {...field}
                  className="input"
                  type={props.type}
                  maxLength={props.maxLength}
                  placeholder={props.placeholder}
                />
              );
            }}
          </Field>

          <>
            {props.passwordField && (
              <button
                type="button"
                onClick={props.togglePasswordIcon}
                className="absolute right-3 top-4 "
              >
                {props.setPasswordVisibile ? (
                  <Image
                    src={icons.hidepassword}
                    alt="password toggle icon"
                    height={24}
                    width={24}
                  />
                ) : (
                  <Image
                    src={icons.showpassword}
                    alt="password toggle icon"
                    height={24}
                    width={24}
                  />
                )}
              </button>
            )}
          </>
        </div>

        <ErrorMessage
          name={props.name}
          component="p"
          className="text-red text-sm absolute mt-1"
        />
      </div>
    </div>
  );
};

export default InputField;
