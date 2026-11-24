import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header country="ae" />
      <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <span className="text-6xl font-extrabold text-brand-green-600">404</span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Page Not Found
          </h1>
          <p className="max-w-md text-sm text-muted-foreground">
            The requested page does not exist or has been relocated as part of the Takhlees platform upgrade.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link href="/ae">
              <Button variant="default">UAE Business Portal</Button>
            </Link>
            <Link href="/in">
              <Button variant="outline">India Career Academy</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer country="ae" />
    </div>
  );
}
