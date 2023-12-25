import { Field, ErrorMessage } from "formik";
import { useOutline } from "../../utilities/hooks";

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
        <div
          onMouseEnter={showOutline}
          onMouseLeave={closeOutline}
          className={`${
            outline ? "border-purple" : "border-gray"
          } w-full rounded-[5px] border-[1px]`}
        >
          <Field
            name={props.name}
            id={props.id}
            component="select"
            className="input"
          >
            <option></option>
            {props.data?.map((item: any, index) => (
              <option key={index} value={item.label} label={item.label} />
            ))}
          </Field>
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

export default SelectField;
