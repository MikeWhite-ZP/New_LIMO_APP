import { Link } from 'wouter';
import { Layout, Button, Card, CardContent } from '../components';
import { Car, Users, Clock, Shield, Star, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Car,
    title: 'Luxury Fleet',
    description: 'Premium vehicles including sedans, SUVs, and stretch limousines maintained to perfection.',
  },
  {
    icon: Users,
    title: 'Professional Chauffeurs',
    description: 'Experienced, courteous, and reliable drivers with extensive background checks.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock service for all your transportation needs, any time of day.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Fully licensed, insured, and committed to your safety on every journey.',
  },
];

const services = [
  { name: 'Airport Transfers', description: 'Seamless airport pickup and drop-off services' },
  { name: 'Corporate Travel', description: 'Professional transportation for business executives' },
  { name: 'Special Events', description: 'Proms, graduations, and celebrations' },
  { name: 'Wedding Transportation', description: 'Elegant rides for your special day' },
];

export default function Home() {
  return (
    <Layout>
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 lg:py-32">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="text-hero-title">
              Premium Luxury Transportation
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl" data-testid="text-hero-subtitle">
              Experience the finest chauffeur services with our fleet of luxury vehicles. 
              Professional drivers, impeccable service, and unmatched comfort for every journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking">
                <Button size="lg" data-testid="button-hero-book">
                  Book Your Ride <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/fleet">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900" data-testid="button-hero-fleet">
                  View Our Fleet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title" data-testid="text-features-title">Why Choose Us</h2>
          <p className="section-subtitle">
            We're committed to providing the highest quality luxury transportation service.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="bordered" className="text-center p-6" data-testid={`card-feature-${index}`}>
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-services-title">
                Our Premium Services
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                From airport transfers to special events, we offer a comprehensive range of 
                luxury transportation services tailored to your needs.
              </p>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start space-x-4" data-testid={`service-item-${index}`}>
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{service.name}</h4>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/services" className="inline-block mt-8">
                <Button variant="outline" data-testid="button-view-services">
                  View All Services <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="bg-gray-200 rounded-2xl h-80 lg:h-96 flex items-center justify-center">
              <Car className="w-24 h-24 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Book your ride today and discover why we're the preferred choice for luxury transportation.
          </p>
          <Link href="/booking">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100" data-testid="button-cta-book">
              Book Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
