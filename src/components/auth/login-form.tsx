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

export function LoginForm() {
  return (
    <Card className="w-full transition-shadow hover:shadow-lg bg-card/80 backdrop-blur-sm border-border/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2 floating-label-group">
            <Input id="email" type="email" placeholder=" " required />
            <Label htmlFor="email" className="floating-label">Email</Label>
          </div>
          <div className="space-y-2 floating-label-group">
             <Input id="password" type="password" placeholder=" " required />
            <Label htmlFor="password">Password</Label>
             <Link href="#" className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary hover:underline">
                Forgot?
              </Link>
          </div>
          <Link href="/dashboard" className="w-full">
            <Button type="submit" className="w-full bg-primary text-primary-foreground transition-transform hover:scale-105 hover:bg-primary/90 btn-shine">
              Login
            </Button>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
