import { Link } from 'wouter';
import { Layout, Button, Card, CardContent } from '../components';
import { Plane, Briefcase, PartyPopper, Heart, MapPin, Clock, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Plane,
    title: 'Airport Transfers',
    description: 'Reliable airport pickup and drop-off services with flight tracking. We monitor your flight and adjust accordingly.',
    features: ['Flight tracking', 'Meet & greet', 'Luggage assistance', 'All major airports'],
  },
  {
    icon: Briefcase,
    title: 'Corporate Travel',
    description: 'Professional transportation for business executives and corporate events. Impress clients and travel in style.',
    features: ['Executive sedans', 'Confidential service', 'Hourly rates available', 'Corporate accounts'],
  },
  {
    icon: PartyPopper,
    title: 'Special Events',
    description: 'Make your special occasions even more memorable with our luxury transportation for proms, graduations, and parties.',
    features: ['Stretch limousines', 'Party buses', 'Custom packages', 'Red carpet service'],
  },
  {
    icon: Heart,
    title: 'Wedding Transportation',
    description: 'Elegant and sophisticated transportation for your wedding day. We ensure you arrive in style.',
    features: ['Bridal packages', 'Guest transportation', 'Decorated vehicles', 'Flexible scheduling'],
  },
  {
    icon: MapPin,
    title: 'Point-to-Point',
    description: 'Direct transportation between any two locations. Perfect for city-to-city travel or any destination.',
    features: ['Door-to-door service', 'Fixed pricing', 'Multiple stops available', 'Interstate travel'],
  },
  {
    icon: Clock,
    title: 'Hourly Charter',
    description: 'Hire a chauffeur and vehicle by the hour for meetings, tours, or any occasion requiring flexibility.',
    features: ['Minimum 2 hours', 'Flexible itinerary', 'Wait time included', 'Perfect for events'],
  },
];

export default function Services() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-services-title">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl" data-testid="text-services-subtitle">
            Comprehensive luxury transportation solutions tailored to your needs. 
            From airport transfers to special events, we've got you covered.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} variant="elevated" className="overflow-hidden" data-testid={`service-card-${index}`}>
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Book Your Service?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us today for a quote or to schedule your luxury transportation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100" data-testid="button-book-now">
                Book Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" data-testid="button-contact">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
