import VerificationEmail from "@/emails/VerificationEmails.emails";
import { ApiResponse } from "../types/ApiResponse.types";
import { resend } from "../lib/resend.lib";


interface VerificationEmailProp{
    email:string,
    username:string,
    verifyCode:string
}

export async function sendVerificationEmail({email,username,verifyCode}:VerificationEmailProp):Promise<ApiResponse> {
    try {
        
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'True Feedback Verification code ',
            react: VerificationEmail({username,otp:verifyCode})
        })

        return {
            success:false,
            message:'Verification email send successfully'
        }
    } catch (error) {
        console.log("Error sending verification email", error);
        return {
            success:false,
            message:'Failed to send verification email'
        }
    }
}



