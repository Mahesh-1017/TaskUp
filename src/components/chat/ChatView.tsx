import { contacts, messages as allMessages } from '@/lib/data';
import type { Contact } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageInput } from './MessageInput';
import { MessageDisplay } from './MessageDisplay';
import { SummaryButton } from './SummaryButton';
import { notFound } from 'next/navigation';
import { ScrollArea } from '../ui/scroll-area';

export async function ChatView({ contactId }: { contactId: string }) {
  const contact: Contact | undefined = contacts.find((c) => c.id === contactId);
  const messages = allMessages[contactId] || [];

  if (!contact) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col bg-background">
      <header className="flex items-center gap-4 p-4 border-b border-border/50 bg-card/50">
        <Avatar className="h-10 w-10">
          <AvatarImage src={contact.avatar} alt={contact.name} data-ai-hint="person portrait" />
          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{contact.name}</h2>
        <div className="ml-auto">
          <SummaryButton messages={messages} />
        </div>
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <MessageDisplay key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      <MessageInput />
    </div>
  );
}
