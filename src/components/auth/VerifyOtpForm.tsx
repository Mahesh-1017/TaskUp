
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from 'firebase/auth';
import { Separator } from '../ui/separator';

export function VerifyOtpForm() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Success!",
        description: "You have been successfully signed in with Google.",
      });
      router.push('/chat');
    } catch (err: any) {
      console.error("Google Sign-In error", err);
      toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: "Could not sign in with Google. Please try again.",
      });
    } finally {
        setLoading(false);
    }
  }

  const handleResendOtp = async () => {
    setResending(true);
    setError(null);

    if (!phone) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Phone number not found.',
      });
      setResending(false);
      router.push('/login');
      return;
    }
    
    try {
      // Note: RecaptchaVerifier should be initialized on the page where resend is triggered
      // or passed through navigation state if possible. Assuming invisible recaptcha.
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container-resend', {
        'size': 'invisible'
      });
      const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      toast({
        title: 'OTP Resent',
        description: `A new code has been sent to ${phone}.`,
      });
    } catch (error: any) {
      console.error('Error resending OTP:', error);
      let description = 'An unexpected error occurred. Please try again.';
      if (error.code === 'auth/too-many-requests') {
        description = 'You have sent too many requests. Please try again later.';
      }
      toast({
        variant: 'destructive',
        title: 'Resend Failed',
        description,
      });
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!window.confirmationResult) {
        toast({
            variant: "destructive",
            title: "Verification Failed",
            description: "No confirmation result found. Please try signing in again."
        });
        setLoading(false);
        router.push('/login');
        return;
    }

    try {
        await window.confirmationResult.confirm(otp);
        toast({
            title: "Success!",
            description: "You have been successfully signed in.",
        });
        router.push('/chat');
    } catch(err: any) {
        console.error("OTP Verification error", err);
        let description = "An unexpected error occurred.";
        if (err.code === 'auth/invalid-verification-code') {
            description = "The code you entered is invalid. Please try again.";
        } else if (err.code === 'auth/code-expired') {
            description = "The code has expired. Please request a new one.";
        }
        setError(description);
        toast({
            variant: "destructive",
            title: "Verification Failed",
            description: description,
        });
    } finally {
        setLoading(false);
    }

  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp">One-Time Password</Label>
          <Input
            id="otp"
            name="otp"
            type="text"
            placeholder="123456"
            required
            maxLength={6}
            pattern="\\d{6}"
            title="Enter the 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}
        </div>
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading || resending}>
          {loading ? 'Verifying...' : 'Verify'}
        </Button>
      </form>

       <div className="flex items-center justify-between text-sm">
          <Button variant="link" size="sm" className="p-0 h-auto" onClick={handleResendOtp} disabled={resending}>
            {resending ? 'Sending...' : 'Resend OTP'}
          </Button>
          <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => router.back()}>
            Change Number
          </Button>
       </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.8 64.4C309.2 96.2 280.2 80 248 80c-73.2 0-132.3 59.2-132.3 132S174.8 384 248 384c88.8 0 124.3-72.8 128.3-109.3H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
        Google
      </Button>
      <div id="recaptcha-container-resend"></div>
    </div>
  );
}
