import dbConnect from "@/src/lib/db.lib";
import UserModel from "@/src/models/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/src/helpers/sendVerificationEmail.helper";

/**
 * @route POST /api/sign-up
 * @desc Register a new user
 * @access Public
 * @body { username: string, email: string, password: string }
 * @returns { success: boolean, message: string }
 */
export async function GET(request:Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        {
          status: 400,
        },
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "Email already registered",
          },
          {
            status: 400,
          },
        );
      } else {
        await UserModel.findByIdAndDelete(existingUserByEmail._id);
      }
    }

    const otp = 'jjjjfjf';
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedOTP = await bcrypt.hash(otp,10)
    const verifyCodeExpire = new Date(Date() + 10) ;

    const newUser = await UserModel.create({
      username,
      email,
      password,
      verifyCode:hashedOTP,
      verifyCodeExpire,
    })



  } catch (error) {
    console.log("Sign Up Error - ", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      },
    );
  }
}
