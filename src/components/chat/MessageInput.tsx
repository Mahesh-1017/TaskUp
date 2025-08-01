'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Image, Video, Send } from 'lucide-react';

export function MessageInput() {
  return (
    <div className="p-4 border-t border-border/50 bg-card/50">
      <form className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input placeholder="Type a message..." className="pr-12" />
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
