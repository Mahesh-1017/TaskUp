
'use client';

import { contacts, messages as allMessages } from '@/lib/data';
import type { Contact, Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageInput } from './MessageInput';
import { MessageDisplay } from './MessageDisplay';
import { SummaryButton } from './SummaryButton';
import { notFound } from 'next/navigation';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Phone, Video } from 'lucide-react';
import { useState } from 'react';
import { CallView } from './CallView';

export function ChatView({ contactId }: { contactId: string }) {
  const contact: Contact | undefined = contacts.find((c) => c.id === contactId);
  const initialMessages = allMessages[contactId] || [];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [callState, setCallState] = useState<{active: boolean, type: 'video' | 'voice' | null}>({ active: false, type: null });

  if (!contact) {
    notFound();
  }
  
  const startCall = (type: 'video' | 'voice') => {
    setCallState({ active: true, type });
  }

  const endCall = () => {
    setCallState({ active: false, type: null });
  }
  
  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `m-${Date.now()}`,
      sender: 'me',
      type: 'text',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };


  if (!contact) {
    notFound();
  }

  return (
    <>
    <div className="flex flex-1 flex-col bg-background">
      <header className="flex items-center gap-4 p-4 border-b border-border/50 bg-card/50">
        <Avatar className="h-10 w-10">
          <AvatarImage src={contact.avatar} alt={contact.name} data-ai-hint="person portrait" />
          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{contact.name}</h2>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => startCall('video')}>
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => startCall('voice')}>
            <Phone className="h-5 w-5" />
          </Button>
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

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
    {callState.active && contact && (
        <CallView 
            contact={contact} 
            type={callState.type!} 
            onEndCall={endCall} 
        />
    )}
    </>
  );
}
