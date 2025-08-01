
'use client';

import { PhoneNumberForm } from './PhoneNumberForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

export function SignupForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Success!",
        description: "You have been successfully signed up with Google.",
      });
      router.push('/chat');
    } catch (err: any) {
      console.error("Google Sign-In error", err);
      toast({
        variant: "destructive",
        title: "Google Sign-Up Failed",
        description: "Could not sign up with Google. Please try again.",
      });
    } finally {
        setLoading(false);
    }
  }

  return (
    <Tabs defaultValue="phone" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="phone">Phone</TabsTrigger>
        <TabsTrigger value="google">Google</TabsTrigger>
      </TabsList>
      <TabsContent value="phone">
        <PhoneNumberForm action="Sign Up" />
      </TabsContent>
      <TabsContent value="google">
         <div className="py-4">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.8 64.4C309.2 96.2 280.2 80 248 80c-73.2 0-132.3 59.2-132.3 132S174.8 384 248 384c88.8 0 124.3-72.8 128.3-109.3H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
                {loading ? 'Redirecting...' : 'Sign Up with Google'}
            </Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}
