import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <FileText className="h-7 w-7 text-primary" />
      <span className="font-headline text-2xl font-bold text-foreground">
        ProProposal
      </span>
    </div>
  );
}
