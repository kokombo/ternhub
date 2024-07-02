import User from "@/models/user";
import { connectDatabase } from "@/database/database";
import { NextResponse } from "next/server";
import { loginFormValidationSchema } from "@/utilities/validation/form-validations";
import { ValidationError } from "yup";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();

  const { email, password } = body;

  try {
    await loginFormValidationSchema.validate(body);

    await connectDatabase();

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        {
          message: "Oops! Invalid credentials, please check and try again.",
        },
        { status: 401 }
      );
    }

    const passwordIsCorrect = await user.comparePassword(password);

    if (!passwordIsCorrect) {
      return NextResponse.json(
        { message: "Invalid password, please check and try again." },
        { status: 401 }
      );
    } else {
      return NextResponse.json(user);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.errors[0] }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
