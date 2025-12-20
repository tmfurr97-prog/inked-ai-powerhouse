'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { generateImage } from '@/ai/flows/generate-image-flow';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Sparkles, Download } from 'lucide-react';

const formSchema = z.object({
  prompt: z.string().min(5, 'Please enter a more descriptive prompt.'),
});

type FormValues = z.infer<typeof formSchema>;
type GenerateImageInput = z.infer<typeof formSchema>;

export default function ImageGeneratorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = async (values: GenerateImageInput) => {
    setIsLoading(true);
    setGeneratedImage(null);
    try {
      const result = await generateImage(values);
      setGeneratedImage(result.imageUrl);
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Error Generating Image',
        description: error.message || 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">AI Image Generator</h1>
        <p className="text-muted-foreground">Turn your visions into reality. Describe the image you want to create.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Image Prompt</CardTitle>
                <CardDescription>
                  Be as descriptive as possible for the best results. Include details like style, colors, and composition.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Prompt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., A cinematic still of a majestic dragon soaring over a mystical forest at dawn, fantasy, hyper-detailed, epic scale."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Generate Image
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Generated Image</CardTitle>
              <CardDescription>Your generated image will appear here.</CardDescription>
            </div>
            {generatedImage && (
              <Button variant="outline" size="icon" onClick={handleDownload} title="Download Image">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="aspect-square w-full bg-muted rounded-lg flex items-center justify-center">
              {isLoading && (
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <Loader2 className="h-10 w-10 animate-spin" />
                  <p>Generating... this may take a moment.</p>
                </div>
              )}
              {!isLoading && generatedImage && (
                <Image
                  src={generatedImage}
                  alt={form.getValues('prompt')}
                  width={512}
                  height={512}
                  className="rounded-lg object-contain"
                />
              )}
               {!isLoading && !generatedImage && (
                <div className="text-center text-muted-foreground">
                    <p>Your image will be displayed here.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
