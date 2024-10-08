import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingUserVerificationByUsername = await UserModel.findOne({            // Here we find the username is already exist and verified or not??
      username,
      isVerified: true,
    });
    if (existingUserVerificationByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });             // Here we find the email is already exist or not??
    const verifyCode = Math.floor(10000 + Math.random() * 9000).toString();

    if (existingUserByEmail) {           // If the email is exist then we return the error response
      true; //Back Here
    } else {                             // If the email is not exist then we store the info in User model
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save()                    // Then, save the info in database

      const emailResponse = await sendVerificationEmail(email, username, verifyCode)
    }
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: true,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
