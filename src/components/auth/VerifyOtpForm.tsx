'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { verifyOtp } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={pending}>
      {pending ? 'Verifying...' : 'Verify'}
    </Button>
  );
}

export function VerifyOtpForm() {
  const [state, formAction] = useFormState(verifyOtp, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.errors?.otp) {
        toast({
            variant: "destructive",
            title: "Verification Failed",
            description: state.errors.otp[0]
        })
    }
  }, [state, toast])

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="otp">One-Time Password</Label>
        <Input
          id="otp"
          name="otp"
          type="text"
          placeholder="123456"
          required
          maxLength={6}
          pattern="\d{6}"
          title="Enter the 6-digit code"
        />
        {state?.errors?.otp && (
          <p className="text-sm font-medium text-destructive">{state.errors.otp[0]}</p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
