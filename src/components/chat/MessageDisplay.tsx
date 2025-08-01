import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { Paperclip, Film, FileText, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export function MessageDisplay({ message }: { message: Message }) {
  const isMe = message.sender === 'me';

  const renderContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <Image
            src={message.content}
            alt="Shared image"
            width={300}
            height={200}
            className="rounded-lg object-cover"
            data-ai-hint="chat image"
          />
        );
      case 'video':
        return (
          <div className="w-[300px] h-[200px] bg-black rounded-lg flex items-center justify-center">
            <Film className="h-12 w-12 text-white" />
          </div>
        );
      case 'document':
        return (
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <span>{message.content}</span>
          </div>
        );
      case 'text':
      default:
        return <p>{message.content}</p>;
    }
  };

  return (
    <div
      key={message.id}
      className={cn(
        'flex w-full items-end gap-2',
        isMe ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-md rounded-2xl p-3 text-sm',
          isMe
            ? 'rounded-br-none bg-primary text-primary-foreground'
            : 'rounded-bl-none bg-card'
        )}
      >
        {renderContent()}
      </div>
    </div>
  );
}
