'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, LoaderCircle, ServerCrash } from 'lucide-react';
import { getSummary } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Message } from '@/lib/types';

export function SummaryButton({ messages }: { messages: Message[] }) {
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');

    const chatThread = messages
      .map((msg) => `${msg.sender === 'me' ? 'User' : 'Contact'}: ${msg.content}`)
      .join('\n');
    
    const result = await getSummary(chatThread);
    
    if (result.error) {
        setError(result.error);
    } else if (result.summary) {
        setSummary(result.summary);
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <Button variant="ghost" size="sm" onClick={handleSummarize} disabled={isLoading}>
        {isLoading ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Summarize
      </Button>
      {summary && (
        <Alert className="mt-4 bg-secondary">
          <Wand2 className="h-4 w-4" />
          <AlertTitle>Conversation Summary</AlertTitle>
          <AlertDescription>{summary}</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <ServerCrash className="h-4 w-4" />
          <AlertTitle>Summarization Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
