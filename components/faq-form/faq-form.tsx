"use client";
import { Formik, Form, type FormikHelpers } from "formik";
import { CustomError, InputField, TextEditor } from "..";
import { SubmitFormLoader } from "@/components/loaders/loaders";
import type { Dispatch, SetStateAction } from "react";
import type { AxiosError } from "axios";

type Props = {
  title: string;
  initialValues: FaqFormType;
  submitForm: (
    values: FaqFormType,
    onSubmitProps: FormikHelpers<FaqFormType>
  ) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<ErrorResponse> | null;
  buttonLabel: string;
  textEditorValue: string;
  textEditorOnchange: Dispatch<SetStateAction<string>>;
};

const FaqForm = (props: Props) => {
  return (
    <div className="flex flex-col gap-[25px] mx-[6.94%] py-11 lg:py-[50px] items-center justify-center text-center">
      <h1 className="text-[28px] font-medium">{props.title}</h1>

      <span>
        <Formik
          initialValues={props.initialValues}
          onSubmit={props.submitForm}
          enableReinitialize
          validateOnBlur={false}
        >
          <Form className="flex flex-col gap-8">
            <InputField
              label="Question"
              name="question"
              id="question"
              type="text"
              disabled={props.isLoading}
            />

            {/* <TextEditor
              label="Answer"
              name="answer"
              id="answer"
              value={props.textEditorValue}
              onChange={props.textEditorOnchange}
              lgWidth={600}
            /> */}

            <div className="sm:mt-14 mt-16 relative flex items-center justify-center w-full">
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
                <div className="w-40 h-[56px]">
                  <SubmitFormLoader />
                </div>
              ) : (
                <button type="submit" className="form_submit_button ">
                  {props.buttonLabel}
                </button>
              )}
            </div>
          </Form>
        </Formik>
      </span>
    </div>
  );
};

export default FaqForm;
