import { Link } from 'wouter';
import { Layout, Button, Card, CardContent } from '../components';
import { MapPin, ArrowRight } from 'lucide-react';

const locations = [
  {
    city: 'Los Angeles',
    state: 'California',
    airports: ['LAX - Los Angeles International', 'BUR - Hollywood Burbank', 'SNA - John Wayne'],
    description: 'Serving the greater Los Angeles metropolitan area including Beverly Hills, Santa Monica, and Orange County.',
  },
  {
    city: 'New York',
    state: 'New York',
    airports: ['JFK - John F. Kennedy', 'LGA - LaGuardia', 'EWR - Newark Liberty'],
    description: 'Comprehensive coverage of NYC including Manhattan, Brooklyn, Queens, and the Tri-State area.',
  },
  {
    city: 'San Francisco',
    state: 'California',
    airports: ['SFO - San Francisco International', 'OAK - Oakland International', 'SJC - San Jose'],
    description: 'Serving the Bay Area including Silicon Valley, Oakland, and the Wine Country.',
  },
  {
    city: 'Miami',
    state: 'Florida',
    airports: ['MIA - Miami International', 'FLL - Fort Lauderdale', 'PBI - Palm Beach'],
    description: 'Coverage throughout South Florida including Miami Beach, Fort Lauderdale, and Palm Beach.',
  },
  {
    city: 'Chicago',
    state: 'Illinois',
    airports: ["ORD - O'Hare International", 'MDW - Midway International'],
    description: 'Serving the Chicago metropolitan area and surrounding suburbs.',
  },
  {
    city: 'Las Vegas',
    state: 'Nevada',
    airports: ['LAS - Harry Reid International'],
    description: 'Complete coverage of the Las Vegas Strip, downtown, and surrounding areas.',
  },
];

export default function Locations() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-locations-title">Service Locations</h1>
          <p className="text-xl text-gray-300 max-w-3xl" data-testid="text-locations-subtitle">
            We provide luxury transportation services in major cities across the United States. 
            Find your location below.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <Card key={index} variant="elevated" data-testid={`location-card-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{location.city}</h3>
                      <p className="text-muted-foreground">{location.state}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{location.description}</p>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Airports Served:</h4>
                    <ul className="space-y-1">
                      {location.airports.map((airport, aIndex) => (
                        <li key={aIndex} className="text-sm text-muted-foreground flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {airport}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="text-other-title">Don't See Your Location?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're constantly expanding our service areas. Contact us to inquire about 
            service in your city or for long-distance transportation.
          </p>
          <Link href="/contact">
            <Button data-testid="button-contact">
              Contact Us <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="section bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Book in Your City?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you need airport transportation or city-to-city travel, we've got you covered.
          </p>
          <Link href="/booking">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100" data-testid="button-book-now">
              Book Your Ride <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
