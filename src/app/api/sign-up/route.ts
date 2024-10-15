import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();
    // console.log("Received Data:", { username, email, password });

    const existingUserVerificationByUsername = await UserModel.findOne({        // Here we find the username is already exist and verified or not??
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

    const existingUserByEmail = await UserModel.findOne({ email });           // Here we find the email is already exist or not??
    const verifyCode = Math.floor(10000 + Math.random() * 9000).toString();
    // console.log(verifyCode);
    

    if (existingUserByEmail) {                                       // If the email is exist then we return the error response
      if (existingUserByEmail.isVerified) {                          // If the email is exist and the user is verified
        return Response.json(
          {
            success: false,
            message: "User already exist with this email",
          },
          { status: 500 }
        );
      } else {                                                   // If the email is exist and the user is not verified
      const hashedPassword = await bcrypt.hash(password, 10);

        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);

        await existingUserByEmail.save();
      }
    } else {                           // If the email is not exist then we store the info in User model
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

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

      await newUser.save();             // Then, save the info in database
    }

    const emailResponse = await sendVerificationEmail(             //Here we send verification email to user
      email,
      username,
      verifyCode
    );
    console.log(email);
    console.log(username);
    console.log(verifyCode);
    
    
    

    if (!emailResponse.success) {                    //If the email verification is not success then return the error msg
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(                          //If the email verification is not success then return the error msg
      {
        success: true,
        message: "User registered successfully. Please verify your email",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error registering user", error);
  
    // Type narrowing to ensure `error` is an instance of Error
    if (error instanceof Error) {
      return Response.json(
        {
          success: false,
          message: error.message || "Error registering user",
        },
        {
          status: 500,
        }
      );
    }
  
    // In case the error is not an instance of Error
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
