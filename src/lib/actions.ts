'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { summarizeChat as summarizeChatFlow } from '@/ai/flows/summarize-chat';

const OTPSchema = z.object({
  otp: z.string().min(6, "Your one-time password must be 6 characters."),
});

export async function verifyOtp(prevState: any, formData: FormData) {
  const validatedFields = OTPSchema.safeParse({
    otp: formData.get('otp'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  // Simulate OTP check
  if (validatedFields.data.otp !== '123456') {
      return {
          errors: { otp: ["Invalid OTP. Please try again."] }
      }
  }

  redirect('/chat');
}

export async function loginOrSignup() {
    redirect('/verify-otp');
}


export async function getSummary(chatThread: string) {
    try {
        const result = await summarizeChatFlow({ messages: chatThread });
        return { summary: result.summary, error: null };
    } catch (error) {
        console.error("Error summarizing chat:", error);
        return { summary: null, error: "Failed to summarize the conversation. Please try again." };
    }
}
