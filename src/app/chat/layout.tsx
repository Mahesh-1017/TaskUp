import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { Suspense } from 'react';

export default function ChatLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { contactId?: string };
}) {
  return (
    <div className="flex h-screen w-full">
      <Suspense fallback={<div className="w-80 bg-card/50 animate-pulse" />}>
        <ChatSidebar activeContactId={params?.contactId} />
      </Suspense>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
