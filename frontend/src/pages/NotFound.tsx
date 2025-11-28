import { Link } from 'wouter';
import { Layout, Button } from '../components';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <Layout>
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-8xl font-bold text-primary mb-4" data-testid="text-404">404</h1>
            <h2 className="text-2xl font-bold mb-4" data-testid="text-not-found-title">Page Not Found</h2>
            <p className="text-muted-foreground mb-8" data-testid="text-not-found-message">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button data-testid="button-home">
                  <Home className="mr-2 w-4 h-4" /> Go Home
                </Button>
              </Link>
              <Button variant="outline" onClick={() => window.history.back()} data-testid="button-back">
                <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
