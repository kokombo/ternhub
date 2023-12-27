import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities";
import { NextResponse } from "next/server";
import User from "@/models/user";
import cloudinary from "@/utilities/general/cloudinary";
import { connectDatabase } from "@/database/database";

export const PATCH = async (req: Request) => {
  const session = await getServerSession(authOptions);

  const picture = await req.json();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Oops! Please sign in to perform action." },
      { status: 401 }
    );
  }

  const userId = session?.user?.id;

  try {
    await connectDatabase();

    const user = await User.findById(userId);

    if (picture) {
      const uploadedPictureResponse = await cloudinary.v2.uploader.upload(
        picture,
        {
          folder: "users_profile_pictures",
          resource_type: "image",
          quality_analysis: true,
        }
      );

      user.image = uploadedPictureResponse.secure_url;

      const updatedUser = await user.save();

      return NextResponse.json(uploadedPictureResponse.secure_url);
    } else {
      return NextResponse.json(
        { message: "Please select a valid image." },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
