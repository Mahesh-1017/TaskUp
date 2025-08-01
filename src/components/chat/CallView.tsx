
'use client';

import { useState, useEffect, useRef } from 'react';
import type { Contact } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, PhoneOff, Video, VideoOff } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type CallViewProps = {
  contact: Contact;
  type: 'video' | 'voice';
  onEndCall: () => void;
};

export function CallView({ contact, type, onEndCall }: CallViewProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(type === 'voice');
  const [callStatus, setCallStatus] = useState('Connecting...');
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, a WebRTC manager would handle this.
    // We are simulating the connection flow.

    const getCameraPermission = async () => {
      // Don't request permissions for voice-only calls
      if (type === 'voice') {
        setIsVideoOff(true);
        setTimeout(() => setCallStatus('On call'), 1500); // Simulate connection time
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCallStatus('On call');
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use video.',
        });
        // Switch to voice call mode if video is denied
        setIsVideoOff(true); 
        setCallStatus('On call (video disabled)');
      }
    };

    getCameraPermission();

    // Cleanup function to stop media tracks when the component unmounts or call ends
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [type, toast]);
  
  // Toggle local video stream
  const toggleVideo = () => {
      if (!hasCameraPermission) return;
      const newVideoState = !isVideoOff;
      setIsVideoOff(newVideoState);
      if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getVideoTracks().forEach(track => track.enabled = !newVideoState);
      }
  }

  // Toggle local audio stream
  const toggleMute = () => {
      const newMuteState = !isMuted;
      setIsMuted(newMuteState);
      if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getAudioTracks().forEach(track => track.enabled = !newMuteState);
      }
  }
  
  const handleEndCall = () => {
    // This already performs cleanup via the useEffect return function
    onEndCall();
  }


  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <Card className="w-full max-w-4xl bg-card/80 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0 relative h-[70vh] flex flex-col justify-between">
          
          {/* Remote video would go here. For now, showing the contact's avatar. */}
          <div className="absolute inset-0 bg-black flex items-center justify-center">
             <div className="text-center">
                <Avatar className="w-40 h-40 border-4 border-primary mx-auto">
                    <AvatarImage src={contact.avatar} alt={contact.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {isVideoOff && type === 'video' && (
                    <p className="mt-4 text-white text-lg">Their video is off</p>
                )}
             </div>
          </div>

          {/* Local Video Preview */}
          <div className="absolute top-4 right-4 w-48 h-auto z-20">
             {type === 'video' && (
                <video ref={videoRef} className={cn("w-full aspect-video rounded-md transition-opacity", isVideoOff ? "opacity-0" : "opacity-100")} autoPlay muted playsInline />
             )}
             {!hasCameraPermission && type === 'video' && (
                <Alert variant="destructive" className="mt-2">
                    <AlertTitle>Camera Access Denied</AlertTitle>
                    <AlertDescription>Enable permissions to use video.</AlertDescription>
                </Alert>
             )}
          </div>
         
          <div className="relative z-10 p-6 flex flex-col justify-between h-full">
            <div className="text-center text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                <h2 className="text-3xl font-bold">{contact.name}</h2>
                <p className="text-lg">{callStatus}</p>
            </div>

            <div className="flex items-center justify-center gap-4">
                <Button variant="secondary" size="icon" className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/30 text-white" onClick={toggleMute}>
                    {isMuted ? <MicOff /> : <Mic />}
                </Button>
                {type === 'video' && (
                  <Button variant="secondary" size="icon" className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/30 text-white" onClick={toggleVideo} disabled={!hasCameraPermission}>
                      {isVideoOff ? <VideoOff /> : <Video />}
                  </Button>
                )}
                 <Button variant="destructive" size="icon" className="rounded-full w-20 h-20" onClick={handleEndCall}>
                    <PhoneOff className="w-8 h-8"/>
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
