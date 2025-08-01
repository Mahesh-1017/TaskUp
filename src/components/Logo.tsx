import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <div
      className={cn(
        'w-16 h-16 rounded-2xl flex items-center justify-center bg-background',
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-10 h-10 text-primary"
        {...props}
      >
        <path d="M7 2v10a5 5 0 0 0 10 0V2h2v10a7 7 0 0 1-14 0V2h2z" />
      </svg>
    </div>
  );
}
