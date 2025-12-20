'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { editCourseContent } from '@/ai/flows/edit-course-content';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';

const formSchema = z.object({
  instruction: z.string().min(5, 'Please provide a clearer instruction.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function NovelWriterPage() {
  const [isPending, startTransition] = useTransition();
  const [story, setStory] = useState<string>("It was a dark and stormy night. A lone figure stood on the cliffside, peering into the raging tempest below.");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instruction: 'Continue the story, introducing a mysterious ship.',
    },
  });

  const onSubmit = async (values: FormValues) => {
    startTransition(async () => {
      try {
        const result = await editCourseContent({
          content: story,
          instruction: values.instruction,
        });
        setStory(result.editedContent);
        form.reset(); // Reset form for next instruction
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'The AI co-writer is taking a break. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Novel Co-writer</h1>
        <p className="text-muted-foreground">Collaborate with your AI partner to bring your story to life.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Manuscript</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Start your novel here..."
              className="min-h-[500px] text-base leading-relaxed"
            />
          </CardContent>
        </Card>

        <Card className="lg:sticky top-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-accent-foreground fill-accent" />
              AI Co-writer
            </CardTitle>
            <CardDescription>Give the AI an instruction to help you write.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="instruction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instruction</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., 'Describe the main character's feelings', 'Add a plot twist', 'Continue the story...'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardContent>
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate
                </Button>
              </CardContent>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
