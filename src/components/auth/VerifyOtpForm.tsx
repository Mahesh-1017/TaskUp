
'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={pending}>
      {pending ? 'Verifying...' : 'Verify'}
    </Button>
  );
}

export function VerifyOtpForm() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

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
       <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify'}
      </Button>
    </form>
  );
}
