import { AuthCard } from '@/components/auth/AuthCard';
import { VerifyOtpForm } from '@/components/auth/VerifyOtpForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify OTP - NumeroConnect',
};

export default function VerifyOtpPage() {
  return (
    <AuthCard
      title="Check your phone"
      description="We've sent a 6-digit code. Please enter it below."
    >
      <VerifyOtpForm />
    </AuthCard>
  );
}
