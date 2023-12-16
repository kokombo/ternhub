import { Formik, Form } from "formik";
import { InputField, TextEditor, UploadFile } from "..";

type Props = {
  title: string;
  initialFormValues: BlogForm;
  submitForm: () => void;
  validate: any;
};

const BlogForm = (props: Props) => {
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
                  label="Blog Title *"
                  name="title"
                  type="text"
                  id="title"
                />

                <UploadFile
                  name="logo"
                  label="Upload Cover Imaage"
                  fileToUpload="cover image"
                />

                <TextEditor label="Blog Copy *" name="description" />

                {/* the below div is needed because the React Quill text editor caused an overlap */}
                <div className="sm:mt-8 mt-14"></div>

                <InputField
                  label="Meta Description*"
                  name="metaDescription"
                  type="text"
                  id="meta"
                />

                <InputField
                  label="Author *"
                  name="author"
                  type="text"
                  id="author"
                />

                <InputField
                  label="Twitter URL (optional)"
                  name="twitter"
                  type="text"
                  id="twitter"
                />

                <InputField
                  label="Portfolio URL (optional)"
                  name="portfolio"
                  type="text"
                  id="portfolio"
                />

                <InputField
                  label="Linkedin URL (optional)"
                  name="linkedin"
                  type="text"
                  id="linkedin"
                />

                <button
                  type="submit"
                  disabled={!formik.isValid}
                  className="form_submit_button "
                >
                  Preview Blog
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default BlogForm;
