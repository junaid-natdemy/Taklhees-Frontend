import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'India — Career Academy',
  description: 'Takhlees Career Academy India: Certified training programs for UAE PR, typing, and business setup.',
};

export default function IndiaFoundationPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8 text-center">
          <Badge variant="secondary" className="text-xs px-3 py-1 bg-brand-charcoal-800 text-white">
            Foundation Setup Active
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            Takhlees Career Academy — India Portal
          </h1>
          <p className="text-lg text-muted-foreground">
            Development foundation successfully initialized for India Career Academy (`/in`).
          </p>

          <Card className="text-left mt-8 border-brand-charcoal-700/30 shadow-premium-md">
            <CardHeader>
              <CardTitle className="text-xl text-brand-charcoal-800 dark:text-brand-charcoal-100">
                Core Architectural Checklist
              </CardTitle>
              <CardDescription>
                Project foundation verification status for India experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-green-600" />
                <span>Independent `/in` route hierarchy with shared design system</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-green-600" />
                <span>Centralized API client pointing to unified Django backend</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-green-600" />
                <span>Admissions workflow and form validation hooks prepared</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-green-600" />
                <span>Accessible, SEO-optimized semantic HTML architecture</span>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
