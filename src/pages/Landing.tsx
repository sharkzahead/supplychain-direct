import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, Factory, TrendingUp, Users, Shield, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-10" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center space-y-6">
            <div className="flex justify-center gap-4 mb-6">
              <Sprout className="h-16 w-16 text-primary" />
              <Factory className="h-16 w-16 text-secondary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Connecting Farmers & Factories
              <span className="block text-primary mt-2">Directly</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Eliminate middlemen. Get fair prices for farmers and fresh raw materials for factories at lower costs.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8">
                  Get Started
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Browse Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose FarmDirect Connect?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Fair Pricing</CardTitle>
                <CardDescription>
                  Farmers get better prices, factories save costs by eliminating middlemen
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-secondary mb-2" />
                <CardTitle>Direct Connection</CardTitle>
                <CardDescription>
                  Build lasting relationships between producers and manufacturers
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-accent mb-2" />
                <CardTitle>Secure Transactions</CardTitle>
                <CardDescription>
                  Safe and transparent platform for all your agricultural trade needs
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* For Farmers Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Sprout className="h-12 w-12 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">For Farmers</h2>
              </div>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-primary mt-1" />
                  <span>Upload crop details with images and pricing</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-primary mt-1" />
                  <span>View real-time demand from factories</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-primary mt-1" />
                  <span>Receive direct purchase requests</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-primary mt-1" />
                  <span>Track your income and sales analytics</span>
                </li>
              </ul>
              <Link to="/auth">
                <Button size="lg" className="mt-6">
                  Register as Farmer
                </Button>
              </Link>
            </div>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <Sprout className="h-32 w-32 text-primary/20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Factories Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="shadow-lg order-2 md:order-1">
              <CardContent className="p-8">
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <Factory className="h-32 w-32 text-secondary/20" />
                </div>
              </CardContent>
            </Card>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <Factory className="h-12 w-12 text-secondary" />
                <h2 className="text-3xl md:text-4xl font-bold">For Factories</h2>
              </div>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-secondary mt-1" />
                  <span>Post raw material requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-secondary mt-1" />
                  <span>Search and filter available crops</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-secondary mt-1" />
                  <span>Contact farmers directly</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-secondary mt-1" />
                  <span>Track procurement efficiency</span>
                </li>
              </ul>
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="mt-6">
                  Register as Factory
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Revolutionize Agricultural Trade?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of farmers and factories already benefiting from direct connections
          </p>
          <Link to="/auth">
            <Button size="lg" className="text-lg px-12">
              Start Trading Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
