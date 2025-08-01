
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Image, Video, Send } from 'lucide-react';
import { useState } from 'react';

type MessageInputProps = {
  onSendMessage: (content: string) => void;
};

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="p-4 border-t border-border/50 bg-card/50">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input 
            placeholder="Type a message..." 
            className="pr-12" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <Button type="button" variant="ghost" size="icon">
          <Image className="h-5 w-5" />
        </Button>
        <Button type="button" variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </Button>
        <Button type="button" variant="ghost" size="icon">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90">
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
