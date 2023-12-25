import { Field, FieldProps, ErrorMessage } from "formik";
import { useOutline } from "../../utilities/hooks";

type Props = {
  name: string;
  data: RadioOption[];
  label: string;
};

const RadioButtonOptions = (props: Props) => {
  const { outline, showOutline, closeOutline } = useOutline();

  return (
    <div className="flex flex-col items-start gap-3">
      <legend
        className={`${
          outline ? "text-purple" : "text-textblack"
        } lg:text-lg text-base`}
      >
        {props.label}
      </legend>

      <div className="relative w-full">
        <Field name={props.name}>
          {({ field, meta, form }: FieldProps) => (
            <div className="flex gap-10" {...field}>
              {props.data.map((option, index) => {
                return (
                  <span
                    key={index}
                    className="flex flex-row gap-2"
                    onMouseEnter={showOutline}
                    onMouseLeave={closeOutline}
                  >
                    <input
                      type="radio"
                      id={option.value}
                      name={props.name}
                      value={option.value}
                      className="radio_button "
                    />

                    <label htmlFor="remote">{option.label} </label>
                  </span>
                );
              })}
            </div>
          )}
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

export default RadioButtonOptions;
