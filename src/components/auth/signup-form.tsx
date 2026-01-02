'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SignupForm() {
  return (
    <Card className="w-full transition-shadow hover:shadow-lg bg-card/80 backdrop-blur-sm border-border/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Enter your information to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
            <div className="space-y-2 floating-label-group">
                <Input id="name" placeholder=" " required />
                <Label htmlFor="name" className="floating-label">Name</Label>
            </div>
            <div className="space-y-2 floating-label-group">
                <Input id="email" type="email" placeholder=" " required />
                <Label htmlFor="email" className="floating-label">Email</Label>
            </div>
            <div className="space-y-2 floating-label-group">
                <Input id="password" type="password" placeholder=" " required />
                <Label htmlFor="password" className="floating-label">Password</Label>
            </div>
            <Link href="/dashboard" className="w-full">
                <Button type="submit" className="w-full bg-primary text-primary-foreground transition-transform hover:scale-105 hover:bg-primary/90 btn-shine">
                    Create Account
                </Button>
            </Link>
        </form>
      </CardContent>
    </Card>
  );
}
