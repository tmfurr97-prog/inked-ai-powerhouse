'use client';

import {
  ArrowRight,
  Combine,
  Compass,
  FileKey,
  FilePen,
  FileSignature,
  FileText,
  FileX,
  FileType,
  ImageIcon,
  Key,
  Layers,
  MousePointer,
  Package,
  Scissors,
  Share2,
  Spline,
  SwatchBook,
  Type,
  View,
  Shield,
  RotateCcw,
  ShieldQuestion,
  Eraser,
  Book,
  BringToFront
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PdfToolsPage() {
  const tools = [
    { title: 'Merge PDF', icon: Combine, description: 'Combine multiple PDFs into a single document.' },
    { title: 'Compress PDF', icon: Package, description: 'Reduce file size by compressing text and images.' },
    { title: 'Split PDF', icon: Scissors, description: 'Extract pages or split a PDF into multiple files.' },
    { title: 'PDF to HTML', icon: FileType, description: 'Convert PDF files into web-friendly HTML.' },
    { title: 'PDF OCR', icon: View, description: 'Make scanned text searchable and copyable.' },
    { title: 'Extract PDF pages', icon: Layers, description: 'Select and save only the pages you need.' },
    { title: 'JPEG to PDF', icon: ImageIcon, description: 'Convert JPEG images into a single PDF.' },
    { title: 'PDF to JPEG', icon: FileText, description: 'Export each PDF page as a separate JPEG file.' },
    { title: 'JPG to PDF', icon: ImageIcon, description: 'Convert JPG images into a single PDF.' },
    { title: 'PDF to JPG', icon: FileText, description: 'Export each PDF page as a separate JPG file.' },
    { title: 'PNG to PDF', icon: ImageIcon, description: 'Convert PNG images into a single PDF.' },
    { title: 'PDF to PNG', icon: FileText, description: 'Export each PDF page as a separate PNG file.' },
    { title: 'Unlock PDF', icon: Key, description: 'Remove password and encryption from your PDFs.' },
    { title: 'PDF to PPT', icon: FileType, description: 'Convert PDF documents into editable PowerPoint files.' },
    { title: 'Flatten PDF', icon: BringToFront, description: 'Make PDF form fields and annotations uneditable.' },
    { title: 'HEIC to PDF', icon: ImageIcon, description: 'Convert HEIC images from your Apple devices to PDF.' },
    { title: 'Word to PDF', icon: FileType, description: 'Convert Microsoft Word documents to PDF.' },
    { title: 'Add page numbers', icon: Book, description: 'Insert page numbers into your PDF document.' },
    { title: 'Crop PDF', icon: Scissors, description: 'Trim the margins of your PDF pages.' },
    { title: 'Sign PDF', icon: FileSignature, description: 'Add your signature to any PDF document.' },
    { title: 'Redact PDF', icon: Eraser, description: 'Permanently remove sensitive information.' },
    { title: 'Annotate PDF', icon: FilePen, description: 'Draw, highlight, and write on your PDF.' },
    { title: 'Excel to PDF', icon: FileType, description: 'Convert Microsoft Excel spreadsheets to PDF.' },
    { title: 'Rotate PDF', icon: RotateCcw, description: 'Rotate all or individual pages in your PDF.' },
    { title: 'Protect PDF', icon: Shield, description: 'Add a password and encrypt your PDF files.' },
    { title: 'PowerPoint to PDF', icon: FileType, description: 'Convert PowerPoint presentations to PDF.' },
    { title: 'Watermark PDF', icon: Spline, description: 'Add a text or image watermark to your PDF.' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">PDF & Image Tools</h1>
        <p className="text-muted-foreground">A complete suite of tools to manage and manipulate your documents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Card key={tool.title} className="flex flex-col transition-transform hover:scale-[1.02] hover:shadow-lg">
            <CardHeader className="flex-row items-start gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <tool.icon className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="font-headline text-lg">{tool.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{tool.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="secondary" disabled>
                <Link href="#">
                  Coming Soon <ArrowRight />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}