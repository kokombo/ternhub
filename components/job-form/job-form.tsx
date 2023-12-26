"use client";
import { Formik, Form, FormikHelpers } from "formik";
import { jobCategories } from "../../constants/data";
import {
  InputField,
  TextEditor,
  UploadFile,
  SubmitFormLoader,
  SelectField,
  CustomError,
  RadioButtonOptions,
} from "..";
import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";

type Props = {
  title: string;
  initialFormValues: JobFormType;
  submitForm: (
    values: JobFormType,
    onSubmitProps: FormikHelpers<JobFormType>
  ) => Promise<void>;
  textEditorValue: string;
  textEditorOnchange: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  isError: boolean;
  error: any;
  buttonLabel: string;
};

const validateJobForm = Yup.object({
  title: Yup.string()
    .required("Job title is required.")
    .max(40, "Maximum length of 40 characters."),
  company: Yup.string()
    .required("Company name is required.")
    .max(30, "Maximum length of 30 characters."),
  location: Yup.string()
    .required("Company location is required.")
    .max(25, "Maximum length of 25 characters."),
  category: Yup.string().required("Job category is required."),
  mode: Yup.string().required("Please specify job mode."),
  email: Yup.string().email("Invalid email format."),
});

const jobModeOptions: RadioOption[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "Onsite" },
];

const JobForm = (props: Props) => {
  return (
    <div className="flex flex-col gap-[25px] mx-[6.94%] py-11 lg:py-[50px] items-center text-center">
      <h1 className="text-[28px] font-medium ">{props.title}</h1>

      <div>
        <Formik
          initialValues={props.initialFormValues}
          onSubmit={props.submitForm}
          validationSchema={validateJobForm}
          validateOnMount
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form className="flex flex-col gap-8 ">
                <InputField
                  label="Job Title *"
                  name="title"
                  type="text"
                  id="title"
                  maxLength={40}
                />

                <InputField
                  label="Company Name *"
                  name="company"
                  type="text"
                  id="company"
                  maxLength={30}
                />

                <InputField
                  label="Company Location *"
                  name="location"
                  type="text"
                  id="location"
                  maxLength={25}
                />

                <TextEditor
                  label="Job Description *"
                  name="description"
                  id="description"
                  value={props.textEditorValue}
                  onChange={props.textEditorOnchange}
                />

                {/* the below div is needed because the React Quill text editor caused an overlap */}
                <div className="sm:mt-4 mt-8"></div>

                <SelectField
                  label="Job Category *"
                  name="category"
                  id="category"
                  data={jobCategories}
                />

                <InputField
                  label="Application Url *"
                  name="site"
                  type="text"
                  id="site"
                  placeholder="e.g. www.theternhub.com/careers/junior-backend-engineer"
                />

                <InputField
                  label="Application Email *"
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Please specify the application email if above is not applicable."
                />

                <RadioButtonOptions
                  name="mode"
                  data={jobModeOptions}
                  label="Job Mode *"
                />

                <InputField
                  label="Salary (optional)"
                  name="salary"
                  type="number"
                  id="salary"
                />

                <UploadFile
                  name="logo"
                  label="Upload Company's Logo"
                  fileToUpload="logo"
                />

                <div className="flex items-center justify-center relative">
                  <span className="absolute">
                    {props.isError && (
                      <CustomError
                        message={props.error?.response?.data?.message}
                        loading={props.isLoading}
                      />
                    )}
                  </span>
                </div>

                <div className="flex self-end">
                  {props.isLoading ? (
                    <SubmitFormLoader />
                  ) : (
                    <button type="submit" className="form_submit_button">
                      {props.buttonLabel}
                    </button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default JobForm;
