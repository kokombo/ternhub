import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import { Field, ErrorMessage, FieldProps } from "formik";

type Props = {
  label: string;
  name: string;
};

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = (props: Props) => {
  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      ["link", "image", "video"],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }, { direction: [] }],
      [
        { color: ["#000000", "#e60000", "#ff9900", "#ffff00"] },
        { background: [] },
      ],
    ],
  };

  var formats = [
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
    "direction",
    "script",
    "background",
  ];

  return (
    <div className="flex flex-col items-start gap-3">
      <label
        htmlFor={props.name}
        className="lg:text-lg text-sm tracking-[1%] text-textblack"
      >
        {props.label}
      </label>

      <Field
        name={props.name}
        render={({ field }: { field: FieldProps }) => (
          <ReactQuill
            {...field}
            modules={modules}
            formats={formats}
            className=" w-[86vw] lg:w-[820px] h-[277px] "
            theme="snow"
            placeholder="write the job description here..."
            // style={{ border: "1px solid green", height: "277px" }}
          />
        )}
        className="mt-3 rounded-[5px] "
      />

      <ErrorMessage
        name={props.name}
        component="p"
        className="text-red text-base"
      />
    </div>
  );
};

export default TextEditor;
