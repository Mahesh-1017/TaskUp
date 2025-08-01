import Link from 'next/link';
import { contacts } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '../Logo';

export async function ChatSidebar({ activeContactId }: { activeContactId?: string }) {
  // In a real app, this would be a server component fetching user's contacts
  const contactList = contacts;

  return (
    <aside className="w-80 flex flex-col border-r border-border/50 bg-card/50">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-4 mb-4">
          <Logo className="w-12 h-12" />
          <h1 className="text-2xl font-headline font-bold">NumeroConnect</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Find contacts..." className="pl-10" />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {contactList.map((contact) => (
            <li key={contact.id}>
              <Link href={`/chat/${contact.id}`}>
                <div
                  className={cn(
                    'flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors cursor-pointer',
                    activeContactId === contact.id && 'bg-secondary'
                  )}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={contact.avatar} alt={contact.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-semibold truncate">{contact.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {contact.lastMessageTimestamp}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
