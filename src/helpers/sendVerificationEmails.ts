import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(          // Here we make a function for sending email
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystry message | Verification code',
            react: VerificationEmail({username, otp: verifyCode}),
          });
        return {success: true, message:"Verification email sends successfully"}
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {success: false, message:"Failed to send verification email"}
    }
}