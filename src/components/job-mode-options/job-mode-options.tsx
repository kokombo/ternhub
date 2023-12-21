import { Field, FieldProps, ErrorMessage } from "formik";
type Props = {
  name: string;
};

const JobModeOptions = (props: Props) => {
  return (
    <div className="flex flex-col items-start gap-3">
      <legend className="lg:text-lg text-sm tracking-[1%] text-textblack">
        Job Mode *
      </legend>

      <div className="relative w-full">
        <Field
          name={props.name}
          render={({ field }: { field: FieldProps }) => (
            <div className="flex gap-10" {...field}>
              <span className=" flex flex-row gap-2">
                <input
                  type="radio"
                  id="remote"
                  name="mode"
                  value="remote"
                  className="radio_button "
                />

                <label htmlFor="remote">Remote</label>
              </span>

              <span className=" flex flex-row gap-2">
                <input
                  type="radio"
                  id="hybrid"
                  name="mode"
                  value="hybrid"
                  className="radio_button "
                />

                <label htmlFor="hybrid">Hybrid</label>
              </span>

              <span className=" flex flex-row gap-2">
                <input
                  type="radio"
                  id="onsite"
                  name="mode"
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
          className="text-red text-sm absolute mt-1"
        />
      </div>
    </div>
  );
};

export default JobModeOptions;
