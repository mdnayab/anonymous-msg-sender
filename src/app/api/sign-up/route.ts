import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";

export async function POST(request: Request){
    await dbConnect()

    try {
        const {username, email, password} = await request.json()

        await
    } catch (error) {
        console.error("Error registering user", error);
        return Response.json(
            {
                success: true,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
    }
}