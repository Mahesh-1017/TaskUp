import { MessageCircle } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-background text-center">
      <MessageCircle className="h-24 w-24 text-muted-foreground/50" />
      <h2 className="mt-6 text-2xl font-semibold font-headline">
        Welcome to NumeroConnect
      </h2>
      <p className="mt-2 text-muted-foreground">
        Select a contact from the sidebar to start a conversation.
      </p>
    </div>
  );
}
