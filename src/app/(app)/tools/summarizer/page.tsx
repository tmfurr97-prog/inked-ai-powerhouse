'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { MarkdownDisplay } from '@/components/markdown-display';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  documentText: z.string().min(100, 'Please paste at least 100 characters to summarize.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function SummarizerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentText: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await summarizeDocument(values);
      setSummary(result.summary);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to summarize the document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Fine-Print Summarizer</h1>
        <p className="text-muted-foreground">Make sense of complex documents. Paste any text to get a clear, concise summary.</p>
      </div>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Document to Summarize</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="documentText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Document Text</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste your lengthy terms of service, legal agreements, or any other complex document here..." className="min-h-[250px] text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Summarize
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {(isLoading || summary) && (
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Here are the key points from your document.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
            {summary && <MarkdownDisplay content={summary} />}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
