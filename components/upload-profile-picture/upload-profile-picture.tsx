import { useState } from "react";
import axios, { type AxiosError } from "axios";
import { useMutation } from "react-query";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { TailSpin } from "react-loader-spinner";

const UploadProfilePicture = () => {
  const { data: session, update } = useSession();

  const [picture, setPicture] = useState<string | null | ArrayBuffer>(""); //new profile picture to upload.

  const uploadPictureRequest = async (
    picture: string | ArrayBuffer
  ): Promise<string | undefined> => {
    const res = await axios.patch(
      "/api/user/upload-picture",
      JSON.stringify(picture)
    );

    return res.data;
  };

  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation<
    string | undefined,
    AxiosError<ErrorResponse>,
    string | ArrayBuffer
  >(
    "uploadProfilePicture",

    uploadPictureRequest,

    {
      onSuccess: () => {
        setPicture("");

        update();
      },
    }
  );

  const initiatePictureUpload = async () => {
    const imagetoUpload = picture as string | ArrayBuffer;

    await mutateAsync(imagetoUpload);
  };

  return (
    <div className="flex_center gap-4">
      {session?.user?.image && !picture ? (
        <span className="block relative h-[200px] w-[200px] rounded-full bg-grey ">
          <Image
            src={session?.user?.image}
            alt="profile picture"
            fill
            quality={100}
            sizes="100vw 80vw"
            className="rounded-full object-cover"
          />
        </span>
      ) : !session?.user?.image && !picture ? (
        <span className="h-[200px] w-[200px] rounded-full bg-purple flex items-center justify-center">
          <p className="text-6xl text-white uppercase">
            {session?.user?.name?.substring(0, 1)}
          </p>
        </span>
      ) : null}

      {picture && (
        <div className="flex_center gap-2">
          <span className="block relative h-[200px] w-[200px] rounded-full bg-grey ">
            <Image
              src={picture as string}
              alt="new profile picture preview"
              fill
              quality={100}
              sizes="100vw 80vw"
              className={`rounded-full object-cover ${
                isLoading && "blur-[1px]"
              } `}
            />

            {isLoading && (
              <span className="absolute left-[40%] top-[40%]">
                <TailSpin
                  visible={true}
                  height="30"
                  width="30"
                  color="#5627FF"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                />
              </span>
            )}
          </span>

          {!isLoading && (
            <span className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  initiatePictureUpload();
                }}
                className="text-base text-deepgreen"
              >
                Confirm upload
              </button>

              <button
                type="button"
                onClick={() => setPicture("")}
                className="text-base text-red"
              >
                Cancel
              </button>
            </span>
          )}
        </div>
      )}

      <label>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isLoading}
          value=""
          name="picture"
          id="picture"
          onChange={(e) => {
            const fileReader = new FileReader();

            fileReader.onload = () => {
              if (fileReader.readyState === 2) {
                setPicture(fileReader.result);
              }
            };

            if (e.target.files) {
              fileReader.readAsDataURL(e.target.files[0]);
            }
          }}
        />

        <div className="flex flex-col gap-1 items-center">
          <span className="border-[1px] border-greyblack py-1 px-2 text-sm tetx-textblack cursor-pointer">
            {session?.user?.image
              ? "Change Profile Image"
              : "Upload Profile Image"}
          </span>

          <span>
            {isError
              ? `${error?.response?.data?.message}`
              : isSuccess
              ? "Image uploaded successfully."
              : null}
          </span>
        </div>
      </label>
    </div>
  );
};

export default UploadProfilePicture;
