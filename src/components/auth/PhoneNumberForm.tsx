
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: any;
  }
}

export function PhoneNumberForm({ action }: { action: 'Login' | 'Sign Up' }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (recaptchaContainerRef.current) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
            'size': 'invisible',
            'callback': (response: any) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!window.recaptchaVerifier) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'reCAPTCHA not initialized. Please try again.',
      });
      setLoading(false);
      return;
    }

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      router.push(`/verify-otp?phone=${encodeURIComponent(phoneNumber)}`);
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      let description = 'An unexpected error occurred. Please try again.';
      if (error.code === 'auth/invalid-phone-number') {
        description = 'The phone number you entered is invalid. Please check and try again.';
      } else if (error.code === 'auth/too-many-requests') {
        description = 'You have sent too many requests. Please try again later.';
      }
      toast({
        variant: 'destructive',
        title: `${action} Failed`,
        description,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 123-456-7890"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading}>
        {loading ? 'Sending...' : action}
      </Button>
      <div ref={recaptchaContainerRef}></div>
    </form>
  );
}
