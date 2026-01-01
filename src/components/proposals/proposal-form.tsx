'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  FileText,
  Users,
  CircleDollarSign,
  Clock,
  Sparkles,
  Loader2,
  Eye,
  Send,
  Download,
} from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { refineProposalAction } from '@/lib/actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { proposalTemplates } from '@/lib/templates';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

const proposalSchema = z.object({
  clientInformation: z.string().min(10, 'Please provide more details about the client.'),
  projectScope: z.string().min(20, 'Please provide a more detailed project scope.'),
  pricingBreakdown: z.string().min(10, 'Please provide a pricing breakdown.'),
  timelines: z.string().min(10, 'Please provide project timelines.'),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

export function ProposalForm() {
  const [isRefining, startRefinement] = useTransition();
  const [isSubmitting, startSubmission] = useTransition();
  const [refinedContent, setRefinedContent] = useState('');
  const [isAiDialogOpen, setAiDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      clientInformation: '',
      projectScope: '',
      pricingBreakdown: '',
      timelines: '',
    },
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = proposalTemplates.find((t) => t.id === templateId);
    if (template) {
      form.reset(template.content);
      toast({
        title: `Template "${template.name}" applied.`,
        description: 'The form has been populated with the template content.',
      });
    }
  };

  const handleRefine = () => {
    startRefinement(async () => {
      const formData = form.getValues();
      const result = await refineProposalAction(formData);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'AI Refinement Failed',
          description: result.error,
        });
      } else if (result.refinedContent) {
        setRefinedContent(result.refinedContent);
        setAiDialogOpen(true);
      }
    });
  };
  
  const handlePrint = () => {
    window.print();
  };

  function onSubmit(data: ProposalFormData) {
    startSubmission(() => {
      toast({
        title: 'Proposal Saved!',
        description: 'Your proposal has been successfully saved as a draft.',
      });
    });
  }

  const renderSection = (
    name: keyof ProposalFormData,
    label: string,
    placeholder: string,
    Icon: React.ElementType,
    delay: number
  ) => (
    <div className="animate-fade-in-up" style={{ animationDelay: `${delay}ms`}}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-lg font-semibold">
              <Icon className="mr-2 h-5 w-5 text-primary" />
              {label}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={placeholder}
                className="min-h-[150px] text-base"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  return (
    <>
      <Card className="mb-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Choose a Template</CardTitle>
          <CardDescription>
            Select a template to quickly start your proposal.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PlaceHolderImages.map((image, i) => {
             const template = proposalTemplates.find(t => t.id === image.id);
             return (
              <div
                key={image.id}
                onClick={() => handleTemplateSelect(image.id)}
                className="group cursor-pointer overflow-hidden rounded-lg border-2 border-transparent transition-all hover:border-primary hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${400 + i * 100}ms` }}
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    data-ai-hint={image.imageHint}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="font-headline font-semibold text-white">{template?.name}</h3>
                  </div>
                </div>
              </div>
             )
          })}
        </CardContent>
      </Card>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="space-y-8 p-6">
              {renderSection(
                'clientInformation',
                'Client Information',
                'Who is this proposal for? e.g., Client Name, Contact Person, etc.',
                Users,
                500
              )}
              {renderSection(
                'projectScope',
                'Project Scope',
                'What are the project goals, deliverables, and boundaries?',
                FileText,
                600
              )}
              {renderSection(
                'pricingBreakdown',
                'Pricing Breakdown',
                'Detail the costs, including phases, services, and total investment.',
                CircleDollarSign,
                700
              )}
              {renderSection(
                'timelines',
                'Timelines',
                'What are the estimated start dates, milestones, and completion dates?',
                Clock,
                800
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end animate-fade-in-up" style={{ animationDelay: '900ms' }}>
            <Button
              type="button"
              variant="outline"
              onClick={handleRefine}
              disabled={isRefining}
              className="transition-transform hover:scale-105"
            >
              {isRefining ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Refine with AI
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" className="transition-transform hover:scale-105">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl print-container">
                 <div className="no-print">
                  <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Proposal Preview</DialogTitle>
                    <DialogDescription>This is how your proposal will look to the client.</DialogDescription>
                  </DialogHeader>
                 </div>
                 <ScrollArea className="h-[70vh] p-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <h1 className="font-headline text-4xl">Project Proposal</h1>
                      <Separator className="my-4" />
                      <h2 className="font-headline flex items-center"><Users className="mr-2 h-5 w-5" /> Client Information</h2>
                      <pre className="whitespace-pre-wrap font-body text-base">{form.watch('clientInformation')}</pre>
                      
                      <h2 className="font-headline flex items-center"><FileText className="mr-2 h-5 w-5" /> Project Scope</h2>
                      <pre className="whitespace-pre-wrap font-body text-base">{form.watch('projectScope')}</pre>
                      
                      <h2 className="font-headline flex items-center"><CircleDollarSign className="mr-2 h-5 w-5" /> Pricing Breakdown</h2>
                      <pre className="whitespace-pre-wrap font-body text-base">{form.watch('pricingBreakdown')}</pre>
                      
                      <h2 className="font-headline flex items-center"><Clock className="mr-2 h-5 w-5" /> Timelines</h2>
                      <pre className="whitespace-pre-wrap font-body text-base">{form.watch('timelines')}</pre>
                    </div>
                  </ScrollArea>
                  <DialogFooter className="no-print">
                      <Button onClick={handlePrint} variant="outline" className="transition-transform hover:scale-105">
                          <Download className="mr-2 h-4 w-4" /> Download as PDF
                      </Button>
                  </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button type="submit" disabled={isSubmitting} style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="transition-transform hover:scale-105">
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Save Draft
            </Button>
          </div>
        </form>
      </Form>

      <Dialog open={isAiDialogOpen} onOpenChange={setAiDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-headline flex items-center text-2xl">
              <Sparkles className="mr-2 h-5 w-5 text-accent" />
              AI Refinement Suggestions
            </DialogTitle>
            <DialogDescription>
              Here are AI-powered suggestions to improve your proposal. Copy any parts you
              like and update your proposal.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[50vh] rounded-md border p-4">
            <pre className="whitespace-pre-wrap font-body text-sm">
              {refinedContent}
            </pre>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
