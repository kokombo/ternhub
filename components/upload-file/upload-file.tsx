import { Field, type FieldProps } from "formik";
import { icons } from "@/constants";
import Image from "next/image";
import { useOutline } from "@/utilities/hooks";

type Props = {
  name: string;
  label: string;
  fileToUpload: string;
};

const UploadFile = (props: Props) => {
  const { outline, showOutline, closeOutline } = useOutline();

  return (
    <div className="flex_start gap-3">
      <label
        htmlFor={props.name}
        className={`${
          outline ? "text-purple" : "text-textblack"
        } lg:text-lg text-base`}
      >
        {props.label}
      </label>

      <Field name={props.name}>
        {({ field, meta, form }: FieldProps) => {
          return (
            <label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                value=""
                name={props.name}
                id={props.name}
                onChange={(e) => {
                  const fileReader = new FileReader();

                  fileReader.onload = () => {
                    if (fileReader.readyState === 2) {
                      form.setFieldValue(props.name, fileReader.result);
                    }
                  };

                  if (e.target.files)
                    fileReader.readAsDataURL(e.target.files[0]);
                }}
              />

              <div
                onMouseEnter={showOutline}
                onMouseLeave={closeOutline}
                className={`${
                  outline ? "border-purple" : "border-gray"
                } rounded-[5px] border-[1px] h-[277px] w-[86vw] lg:w-[820px] border-gray flex_center justify-center`}
              >
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

              <div className="mt-1 flex flex-col items-start">
                {field?.value && (
                  <div className="flex justify-between items-center w-full border-gray border-[1px] h-[42px] rounded-[5px] bg-grey px-2 mt-5">
                    <article className="flex items-center gap-2">
                      <Image
                        src={icons.uploadsuccess}
                        alt="image-icon"
                        height={24}
                        width={24}
                      />

                      <p className="text-green">
                        Image uploaded successfully - 100% done
                      </p>
                    </article>

                    <article className="flex items-center gap-2">
                      <Image
                        src={icons.tickcircle}
                        alt="100% upload icon"
                        height={24}
                        width={24}
                      />
                    </article>
                  </div>
                )}

                <>
                  {meta.touched && meta.error ? (
                    <p className="text-red text-sm"> {meta.error} </p>
                  ) : null}
                </>
              </div>
            </label>
          );
        }}
      </Field>
    </div>
  );
};

export default UploadFile;
