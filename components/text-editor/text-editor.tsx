import "quill/dist/quill.snow.css";
import { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import { useOutline } from "@/utilities/hooks";
import ReactQuill from "react-quill";

type Props = {
  label: string;
  name: string;
  id: string;
  value: string;
  lgWidth: number;
  onChange: Dispatch<SetStateAction<string>>;
};

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = (props: Props) => {
  const { outline, showOutline, closeOutline } = useOutline();

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
        className={`${
          outline ? "text-purple" : "text-textblack"
        } lg:text-lg text-base rounded-[5px]`}
      >
        {props.label}
      </label>

      <div
        onMouseEnter={showOutline}
        onMouseLeave={closeOutline}
        className="rounded-[5px]"
      >
        {/* <ReactQuill
          value={props.value}
          onChange={props.onChange}
          id={props.id}
          modules={modules}
          formats={formats}
          className={`h-[277px] w-[86vw] lg:w-[${props.lgWidth}px]`}
          theme="snow"
          placeholder="write the job description here..."
        /> */}
      </div>
    </div>
  );
};

export default TextEditor;
