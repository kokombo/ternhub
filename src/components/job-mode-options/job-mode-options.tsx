import { Field, FieldProps, ErrorMessage } from "formik";
type Props = {
  name: string;
};

const JobModeOptions = (props: Props) => {
  return (
    <div className="flex flex-col items-start gap-6">
      <legend className="lg:text-lg text-sm tracking-[1%] text-textblack">
        Job Mode *
      </legend>

      <Field
        name={props.name}
        render={({ field }: { field: FieldProps }) => (
          <div className="flex gap-10" {...field}>
            <span className=" flex flex-row gap-2">
              <input
                type="radio"
                id="remote"
                name="jobMode"
                value="remote"
                className="radio_button "
              />

              <label htmlFor="remote">Remote</label>
            </span>

            <span className=" flex flex-row gap-2">
              <input
                type="radio"
                id="hybrid"
                name="jobMode"
                value="hybrid"
                className="radio_button "
              />

              <label htmlFor="hybrid">Hybrid</label>
            </span>

            <span className=" flex flex-row gap-2">
              <input
                type="radio"
                id="onsite"
                name="jobMode"
                value="onsite"
                className="radio_button "
              />

              <label htmlFor="onsite">Onsite</label>
            </span>
          </div>
        )}
      />

      <ErrorMessage
        name={props.name}
        component="p"
        className="text-red text-base"
      />
    </div>
  );
};

export default JobModeOptions;
