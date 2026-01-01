import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockProposals } from '@/lib/data';
import { PlusCircle, ArrowRight } from 'lucide-react';
import type { Proposal } from '@/lib/types';

const statusVariantMap: Record<Proposal['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
  'Accepted': 'default',
  'Sent': 'secondary',
  'Draft': 'outline',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 animate-fade-in">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Your Proposals
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your existing proposals or create a new one.
          </p>
        </div>
        <Link href="/proposals/new">
          <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="transition-transform hover:scale-105">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New Proposal
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProposals.map((proposal, i) => (
          <Card 
            key={proposal.id} 
            className="flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold">{proposal.title}</CardTitle>
                <Badge variant={statusVariantMap[proposal.status] || 'secondary'}>{proposal.status}</Badge>
              </div>
              <CardDescription>For: {proposal.clientName}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                Created on: {new Date(proposal.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full transition-colors hover:bg-accent/80">
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
