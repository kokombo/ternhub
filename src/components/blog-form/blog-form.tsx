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
import * as Yup from "yup";
import { blogCategories } from "@/constants/data";

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
  error: any;
  buttonLabel: string;
};

const validateBlogForm = Yup.object({
  title: Yup.string()
    .required("Blog title is required.")
    .max(80, "Maximum length of 80 characters."),
  metaDescription: Yup.string()
    .required("Blog meta description is required.")
    .max(80, "Maximum length of 80 characters."),
  author: Yup.string().required("Blog author is required."),
  image: Yup.string().required("Upload blog cover image."),
  category: Yup.string().required("Please select blog category."),
});

const BlogForm = (props: Props) => {
  return (
    <div className="flex flex-col gap-[25px] mx-[6.94%] py-11 lg:py-[50px] items-center text-center">
      <h1 className="text-[28px] font-medium">{props.title}</h1>

      <div>
        <Formik
          initialValues={props.initialFormValues}
          onSubmit={props.submitForm}
          validationSchema={validateBlogForm}
          validateOnMount
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form className="flex flex-col gap-8 ">
                <InputField
                  label="Blog Title *"
                  name="title"
                  type="text"
                  id="title"
                  maxLength={80}
                />

                <UploadFile
                  name="image"
                  label="Upload A Cover Image *"
                  fileToUpload="cover image"
                />

                <TextEditor
                  label="Blog Copy *"
                  name="content"
                  id="content"
                  value={props.textEditorValue}
                  onChange={props.textEditorOnchange}
                />

                {/* the below div is needed because the React Quill text editor caused an overlap */}
                <div className="sm:mt-4 mt-8"></div>

                <InputField
                  label="Meta Description*"
                  name="metaDescription"
                  type="text"
                  id="meta"
                  maxLength={80}
                />

                <SelectField
                  label="Blog Category *"
                  name="category"
                  id="category"
                  data={blogCategories}
                />

                <InputField
                  label="Author *"
                  name="author"
                  type="text"
                  id="author"
                />

                <InputField
                  label="Twitter (optional)"
                  name="twitter"
                  type="text"
                  id="twitter"
                  placeholder="e.g. @theternhub"
                />

                <InputField
                  label="Portfolio (optional)"
                  name="portfolio"
                  type="text"
                  id="portfolio"
                  placeholder="e.g. www.myportfolio.com"
                />

                <InputField
                  label="Linkedin (optional)"
                  name="linkedin"
                  type="text"
                  id="linkedin"
                  placeholder="e.g. www.linkedin.com/theternhub"
                />

                <div className="flex items-center justify-center relative">
                  <span className="absolute">
                    {props.isError && (
                      <CustomError
                        message={props.error?.response?.data?.message}
                      />
                    )}
                  </span>
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
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default BlogForm;
