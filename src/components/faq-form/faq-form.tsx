"use client";
import { Formik, Form, FormikHelpers } from "formik";
import { CustomError, InputField, SubmitFormLoader, TextEditor } from "..";
import { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  initialValues: FaqFormType;
  submitForm: (
    values: FaqFormType,
    onSubmitProps: FormikHelpers<FaqFormType>
  ) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error: any;
  buttonLabel: string;
  textEditorValue: string;
  textEditorOnchange: Dispatch<SetStateAction<string>>;
};

const FaqForm = (props: Props) => {
  return (
    <div className="flex flex-col gap-[25px] mx-[6.94%] py-11 lg:py-[50px] items-center text-center">
      <h1 className="text-[28px] font-medium">{props.title}</h1>

      <div>
        <Formik
          initialValues={props.initialValues}
          onSubmit={props.submitForm}
          enableReinitialize
        >
          <Form className="flex flex-col gap-8">
            <InputField
              label="Question"
              name="question"
              id="question"
              type="text"
            />

            <TextEditor
              label="Answer"
              name="answer"
              id="answer"
              value={props.textEditorValue}
              onChange={props.textEditorOnchange}
            />

            {/* the below div is needed because the React Quill text editor caused an overlap */}
            <div className="sm:mt-3 mt-6"></div>

            <div className="float-left">
              {props.isError && (
                <CustomError message={props.error.response.data.message} />
              )}
            </div>

            <div className="flex self-end">
              {props.isLoading ? (
                <SubmitFormLoader />
              ) : (
                <button type="submit" className="form_submit_button ">
                  {props.buttonLabel}
                </button>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default FaqForm;
