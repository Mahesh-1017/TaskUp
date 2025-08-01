import { ChatView } from '@/components/chat/ChatView';
import { contacts } from '@/lib/data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: { contactId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const contact = contacts.find((c) => c.id === params.contactId);
  if (!contact) {
    return { title: 'Chat - NumeroConnect' };
  }
  return {
    title: `Chat with ${contact.name} - NumeroConnect`,
  };
}

export default function ContactChatPage({ params }: Props) {
  // Validate that the contactId exists
  const contactExists = contacts.some((c) => c.id === params.contactId);
  if (!contactExists) {
    notFound();
  }

  return (
    <Suspense
      key={params.contactId}
      fallback={
        <div className="flex flex-1 flex-col">
          <div className="p-4 border-b border-border/50 h-[73px] bg-card/50 animate-pulse"></div>
          <div className="flex-1 p-4 bg-background animate-pulse"></div>
          <div className="p-4 border-t border-border/50 h-[72px] bg-card/50 animate-pulse"></div>
        </div>
      }
    >
      <ChatView contactId={params.contactId} />
    </Suspense>
  );
}
