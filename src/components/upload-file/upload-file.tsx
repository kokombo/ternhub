import { Field } from "formik";
import { icons } from "@/constants";
import Image from "next/image";

type Props = {
  name: string;
  label: string;
  fileToUpload: string;
};

const UploadFile = (props: Props) => {
  return (
    <div className="flex_start gap-3">
      <label
        htmlFor={props.name}
        className="lg:text-lg text-sm tracking-[1%] text-textblack"
      >
        {props.label}
      </label>

      <label>
        <Field
          type="file"
          component="input"
          name={props.name}
          accept="image/*"
          className="hidden"
        />

        <div className="h-[277px] w-[86vw] lg:w-[820px] rounded-[5px] border-[1px] border-gray flex_center justify-center ">
          <Image
            src={icons.upload}
            alt="upload image icon"
            className="h-10 w-10"
          />

          <p className="text-sm mt-10 ">
            <span className=" text-purple">Browse</span>, or drop{" "}
            {props.fileToUpload} here
          </p>
        </div>
      </label>
    </div>
  );
};

export default UploadFile;
