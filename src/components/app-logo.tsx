import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
        <Bot className="h-6 w-6" />
      </div>
      <h1 className="font-headline text-xl font-bold text-primary-foreground hidden group-data-[state=expanded]:block">
        AI Powerhouse
      </h1>
    </div>
  );
}
