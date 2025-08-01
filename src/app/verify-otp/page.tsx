
'use client';
import { AuthCard } from '@/components/auth/AuthCard';
import { VerifyOtpForm } from '@/components/auth/VerifyOtpForm';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';


function VerifyOtpContent() {
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone');

  return (
     <AuthCard
      title="Check your phone"
      description={`We've sent a 6-digit code to ${phone || 'your phone'}. Please enter it below.`}
    >
      <VerifyOtpForm />
    </AuthCard>
  )
}


export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
