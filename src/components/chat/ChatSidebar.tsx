
'use client';
import Link from 'next/link';
import { contacts, currentUser } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, User, Settings, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '../Logo';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';

export function ChatSidebar() {
  const { toast } = useToast();
  const pathname = usePathname();
  const activeContactId = pathname.split('/').pop();

  const handleShare = () => {
    const url = window.location.origin;
    if (navigator.share) {
      navigator.share({
        title: 'Join me on NumeroConnect',
        text: 'Let\'s chat on NumeroConnect!',
        url: url,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: 'Link Copied!',
        description: 'Invite link has been copied to your clipboard.',
      });
    }
  };

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
          {contacts.map((contact) => (
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
      <div className="p-4 border-t border-border/50">
          <div className="flex items-center justify-between">
              <Link href="/profile" className="flex items-center gap-2">
                 <Avatar className="h-10 w-10">
                    {currentUser.avatar ? (
                        <AvatarImage src={currentUser.avatar} alt="Your profile" data-ai-hint="person portrait" />
                    ) : (
                        <AvatarFallback>
                           <User className="h-5 w-5" />
                        </AvatarFallback>
                    )}
                </Avatar>
                <div>
                  <p className="font-semibold">{currentUser.name}</p>
                </div>
              </Link>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
                <Link href="/profile">
                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                    </Button>
                </Link>
              </div>
          </div>
      </div>
    </aside>
  );
}
