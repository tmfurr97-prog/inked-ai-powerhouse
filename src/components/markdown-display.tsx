'use client';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

export function MarkdownDisplay({ content, className }: { content: string; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <ReactMarkdown
        components={{
          h1: ({...props }) => <h1 className="text-2xl font-bold font-headline mt-4" {...props} />,
          h2: ({...props }) => <h2 className="text-xl font-bold font-headline mt-3" {...props} />,
          h3: ({...props }) => <h3 className="text-lg font-bold mt-2" {...props} />,
          p: ({...props }) => <p className="leading-relaxed" {...props} />,
          ul: ({...props }) => <ul className="list-disc list-inside space-y-2" {...props} />,
          ol: ({...props }) => <ol className="list-decimal list-inside space-y-2" {...props} />,
          pre: ({...props }) => <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto" {...props} />,
          code: ({...props }) => <code className="font-code bg-muted px-1.5 py-1 rounded" {...props} />,
          table: ({...props}) => <table className="w-full border-collapse" {...props} />,
          th: ({...props}) => <th className="border p-2 text-left font-semibold" {...props} />,
          td: ({...props}) => <td className="border p-2" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
