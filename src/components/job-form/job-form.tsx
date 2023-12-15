import { Formik, Form } from "formik";
import { InputField, TextEditor, JobModeOptions, UploadFile } from "..";

type Props = {
  title: string;
  initialFormValues: JobForm;
  submitForm: () => void;
  validate: any;
};

const JobForm = (props: Props) => {
  return (
    <div className="flex flex-col gap-[25px] mx-[6.94%] py-11 lg:py-[50px] items-center text-center">
      <h1 className="text-[28px] font-medium ">{props.title}</h1>

      <div>
        <Formik
          initialValues={props.initialFormValues}
          onSubmit={props.submitForm}
          validate={props.validate}
          validateOnMount
        >
          {(formik) => {
            return (
              <Form className="flex flex-col gap-8 ">
                <InputField
                  label="Job Title *"
                  name="title"
                  type="text"
                  id="title"
                />

                <InputField
                  label="Company Name *"
                  name="company"
                  type="text"
                  id="company"
                />

                <InputField
                  label="Company Location *"
                  name="location"
                  type="text"
                  id="location"
                />

                <TextEditor label="Job Description *" name="description" />

                <InputField
                  label="Company Website *"
                  name="site"
                  type="text"
                  id="site"
                />

                <JobModeOptions name="mode" />

                <InputField
                  label="Salary (optional)"
                  name="salary"
                  type="text"
                  id="salary"
                />

                <UploadFile
                  name="logo"
                  label="Upload Company's Logo"
                  fileToUpload="logo"
                />

                <button
                  type="submit"
                  disabled={!formik.isValid}
                  className="form_submit_button "
                >
                  Preview Job
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default JobForm;
