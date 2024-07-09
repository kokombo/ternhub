import cloudinary from "./cloudinary";
import DataURIParser from "datauri/parser";
import path from "node:path";

const parser = new DataURIParser();

export const uploadImage = async (image: File) => {
  const base64Image = parser.format(
    path.extname(image.name).toString(),
    Buffer.from(await image.arrayBuffer())
  );

  const uploadedImageResponse = await cloudinary.v2.uploader.upload(
    base64Image.content as string,

    { resoure_type: "image", upload_preset: "ternhubImages" }
  );

  return uploadedImageResponse;
};
