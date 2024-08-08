import { NextResponse, type NextRequest } from "next/server";
import User from "@/models/user";
import cloudinary from "@/utilities/general/cloudinary";
import { connectDatabase } from "@/database/database";
import { getServerSession } from "@/utilities/auth/getServerSession";

export const PATCH = async (req: NextRequest) => {
  const session = await getServerSession();

  const picture = await req.json();

  if (!session) {
    return NextResponse.json(
      { message: "Oops! Please sign in to perform action." },
      { status: 401 }
    );
  }

  try {
    await connectDatabase();

    const user = await User.findById(session.user.id);

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

      await user.save();

      return NextResponse.json(uploadedPictureResponse.secure_url);
    }

    return NextResponse.json(
      { message: "Please select a valid image." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
