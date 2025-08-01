import { AuthCard } from '@/components/auth/AuthCard';
import { LoginForm } from '@/components/auth/LoginForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - NumeroConnect',
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back!"
      description="Enter your credentials to access your account."
    >
      <div className="space-y-4">
        <LoginForm />
        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Button variant="link" asChild className="p-0 h-auto">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </AuthCard>
  );
}
