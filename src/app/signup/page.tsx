import { AuthCard } from '@/components/auth/AuthCard';
import { SignupForm } from '@/components/auth/SignupForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - NumeroConnect',
};

export default function SignupPage() {
  return (
    <AuthCard
      title="Create an Account"
      description="Get started with NumeroConnect today."
    >
      <div className="space-y-4">
        <SignupForm />
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Button variant="link" asChild className="p-0 h-auto">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </AuthCard>
  );
}
