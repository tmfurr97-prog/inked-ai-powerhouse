'use client';

import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ProPage() {

    const features = [
        "Access to all AI writer tools",
        "Unlimited novel co-writing",
        "All PDF & Image manipulation tools",
        "AI-powered course generation",
        "Priority email support",
        "Early access to new features"
    ];

    const handleUpgrade = () => {
        // This is where you would trigger the Stripe checkout flow
        alert("Redirecting to Stripe checkout... (placeholder)");
    };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 min-h-[calc(100vh-120px)]">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Go <span className="text-primary">Pro</span> & Unlock Everything
        </h1>
        <p className="text-lg text-muted-foreground">
          Supercharge your productivity and creativity. Upgrade to the Pro plan to get unlimited access to all our powerful AI tools.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        {/* Free Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>For getting started</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-2">
            <p className="text-4xl font-bold">$0<span className="text-lg font-normal text-muted-foreground">/mo</span></p>
            <p className="text-sm text-muted-foreground">Basic access to a limited set of tools.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Your Current Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="flex flex-col border-2 border-primary shadow-lg relative">
           <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold rounded-full flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Most Popular</span>
            </div>
          <CardHeader>
            <CardTitle>Pro Plan</CardTitle>
            <CardDescription>For power users and creators</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-6">
            <p className="text-4xl font-bold">$19<span className="text-lg font-normal text-muted-foreground">/mo</span></p>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleUpgrade}>
              <Zap className="mr-2" />
              Upgrade Now
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For teams and businesses</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-2">
             <p className="text-4xl font-bold">Custom</p>
             <p className="text-sm text-muted-foreground">Tailored solutions for your entire organization.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Contact Sales</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
