"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import Image from "next/image";
import { toast } from "react-toastify";

const UploadProfilePicture = () => {
  const [picture, setPicture] = useState<string | null | ArrayBuffer>("");

  const uploadPictureRequest = async (
    picture: string | ArrayBuffer
  ): Promise<string | undefined> => {
    const res = await axios.patch(
      "/api/user/upload-picture",
      JSON.stringify(picture)
    );

    return res.data;
  };

  const { mutateAsync, data, isLoading, isError, error } = useMutation(
    "uploadProfilePicture",
    uploadPictureRequest,
    {
      onSuccess: () => {},

      onError: (error: any) => {},
    }
  );

  const initiatePictureUpload = async () => {
    const imagetoUpload = picture as string | ArrayBuffer;

    await mutateAsync(imagetoUpload);
  };

  return (
    <div>
      <label>
        <input
          type="file"
          accept="image/*"
          className="hidden"
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

              initiatePictureUpload();
            }
          }}
        />

        <div>
          <p>Upload Profile Picture</p>
        </div>
      </label>

      {data && (
        <Image
          src={data}
          alt="pic"
          height={48}
          width={48}
          className="rounded-full object-contain"
        />
      )}
    </div>
  );
};

export default UploadProfilePicture;
