'use client';

import { loginOrSignup } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm() {
  return (
    <form action={loginOrSignup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="id">Phone Number or ID</Label>
        <Input
          id="id"
          name="id"
          type="text"
          placeholder="e.g., +1234567890 or user_id"
          required
        />
      </div>
      <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
        Login
      </Button>
    </form>
  );
}
