
'use server';

import { redirect } from 'next/navigation';
import { summarizeChat as summarizeChatFlow } from '@/ai/flows/summarize-chat';

export async function getSummary(chatThread: string) {
    try {
        const result = await summarizeChatFlow({ messages: chatThread });
        return { summary: result.summary, error: null };
    } catch (error) {
        console.error("Error summarizing chat:", error);
        return { summary: null, error: "Failed to summarize the conversation. Please try again." };
    }
}
