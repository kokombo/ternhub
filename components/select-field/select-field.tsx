import { Field, ErrorMessage, FieldProps } from "formik";
import { useOutline } from "@/utilities/hooks";

type Props = {
  label: string;
  name: string;
  id: string;
  data: any[];
};

const SelectField = (props: Props) => {
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
        <Field name={props.name} id={props.id}>
          {({ field, form, meta }: FieldProps) => {
            return (
              <select
                onMouseEnter={showOutline}
                onMouseLeave={closeOutline}
                {...field}
                className={`select_field ${
                  outline ? "border-purple" : "border-gray"
                } `}
              >
                <option></option>
                {props.data?.map((item: any, index) => (
                  <option key={index} value={item.value}>
                    {item.key}
                  </option>
                ))}
              </select>
            );
          }}
        </Field>

        <ErrorMessage
          name={props.name}
          component="p"
          className="text-red text-sm absolute mt-1"
        />
      </div>
    </div>
  );
};

export default SelectField;
