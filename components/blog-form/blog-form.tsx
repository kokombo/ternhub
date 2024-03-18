import { Formik, Form, FormikHelpers } from "formik";
import {
  CustomError,
  InputField,
  SubmitFormLoader,
  TextEditor,
  UploadFile,
  SelectField,
} from "..";
import { Dispatch, SetStateAction } from "react";
import { blogCategories } from "@/constants/data";
import { blogFormValidationSchema } from "@/utilities/validation/form-validations";
import { AxiosError } from "axios";

type Props = {
  title: string;
  initialFormValues: BlogFormType;
  submitForm: (
    values: BlogFormType,
    onSubmitProps: FormikHelpers<BlogFormType>
  ) => Promise<void>;
  textEditorValue: string;
  textEditorOnchange: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<ErrorResponse> | null;
  buttonLabel: string;
};

const BlogForm = (props: Props) => {
  return (
    <div className="flex flex-col gap-[25px] mx-[6.94%] py-11 lg:py-[50px] items-center text-center">
      <h1 className="text-[28px] font-medium">{props.title}</h1>

      <div>
        <Formik
          initialValues={props.initialFormValues}
          onSubmit={props.submitForm}
          validationSchema={blogFormValidationSchema}
          enableReinitialize
          validateOnBlur={false}
        >
          <Form className="flex flex-col gap-8 ">
            <InputField
              label="Blog Title *"
              name="title"
              type="text"
              id="title"
              maxLength={100}
              disabled={props.isLoading}
            />

            <UploadFile
              name="image"
              label="Upload A Cover Image *"
              fileToUpload="cover image"
            />

            {/* <TextEditor
              label="Blog Copy *"
              name="content"
              id="content"
              value={props.textEditorValue}
              onChange={props.textEditorOnchange}
              lgWidth={820}
            /> */}

            {/* the below div is needed because the React Quill text editor caused an overlap */}
            <div className="sm:mt-4 mt-8"></div>

            <InputField
              label="Meta Description*"
              name="metaDescription"
              type="text"
              id="meta"
              maxLength={150}
              disabled={props.isLoading}
            />

            <SelectField
              label="Blog Category *"
              name="category"
              id="category"
              data={blogCategories}
              disabled={props.isLoading}
            />

            <InputField
              label="Author *"
              name="author.name"
              type="text"
              id="name"
              disabled={props.isLoading}
            />

            <InputField
              label="Twitter (optional)"
              name="author.twitter"
              type="text"
              id="twitter"
              placeholder="e.g. @theternhub"
              disabled={props.isLoading}
            />

            <InputField
              label="Portfolio (optional)"
              name="author.portfolio"
              type="text"
              id="portfolio"
              placeholder="e.g. www.myportfolio.com"
              disabled={props.isLoading}
            />

            <InputField
              label="Linkedin (optional)"
              name="author.linkedin"
              type="text"
              id="linkedin"
              placeholder="e.g. www.linkedin.com/theternhub"
              disabled={props.isLoading}
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
                <div className="w-40 h-[56px]">
                  {" "}
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
      </div>
    </div>
  );
};

export default BlogForm;
