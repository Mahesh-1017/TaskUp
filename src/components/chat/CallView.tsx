
'use client';

import { useState, useEffect } from 'react';
import type { Contact } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, PhoneOff, Video, VideoOff, ScreenShare, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';


type CallViewProps = {
  contact: Contact;
  type: 'video' | 'voice';
  onEndCall: () => void;
};

export function CallView({ contact, type, onEndCall }: CallViewProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(type === 'voice');
  const [callStatus, setCallStatus] = useState('Ringing...');

  useEffect(() => {
    const timer = setTimeout(() => setCallStatus('00:12'), 2000); // Simulate connection
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6 flex flex-col items-center justify-between h-[500px]">
            <div className="text-center">
                <h2 className="text-2xl font-bold">{contact.name}</h2>
                <p className="text-muted-foreground">{callStatus}</p>
            </div>

            <div className="relative">
                <Avatar className="w-40 h-40 border-4 border-primary">
                    <AvatarImage src={contact.avatar} alt={contact.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {isVideoOff && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <Phone className="w-16 h-16 text-white" />
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">
                <Button variant="secondary" size="icon" className="rounded-full w-16 h-16" onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <MicOff /> : <Mic />}
                </Button>
                <Button variant={type === 'video' ? 'secondary' : 'default'} size="icon" className="rounded-full w-16 h-16" onClick={() => setIsVideoOff(!isVideoOff)}>
                    {isVideoOff ? <VideoOff /> : <Video />}
                </Button>
                 <Button variant="destructive" size="icon" className="rounded-full w-20 h-20" onClick={onEndCall}>
                    <PhoneOff className="w-8 h-8"/>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
