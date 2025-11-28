import { Link } from 'wouter';
import { Layout, Button, Card, CardContent } from '../components';
import { Users, Briefcase, ArrowRight } from 'lucide-react';

const vehicles = [
  {
    name: 'Executive Sedan',
    description: 'Perfect for business travel and airport transfers. Comfortable and elegant.',
    capacity: '3 passengers',
    luggage: '3 bags',
    image: null,
  },
  {
    name: 'Luxury SUV',
    description: 'Spacious and stylish. Ideal for families or groups needing extra room.',
    capacity: '6 passengers',
    luggage: '5 bags',
    image: null,
  },
  {
    name: 'Premium Sedan',
    description: 'Top-tier luxury for those who demand the very best in comfort and style.',
    capacity: '3 passengers',
    luggage: '3 bags',
    image: null,
  },
  {
    name: 'Stretch Limousine',
    description: 'Make a grand entrance. Perfect for special occasions and celebrations.',
    capacity: '8-10 passengers',
    luggage: '4 bags',
    image: null,
  },
  {
    name: 'Executive Van',
    description: 'Comfortable group transportation with ample space for passengers and luggage.',
    capacity: '10-14 passengers',
    luggage: '10 bags',
    image: null,
  },
  {
    name: 'Party Bus',
    description: 'The ultimate party experience on wheels. Perfect for bachelor parties and celebrations.',
    capacity: '20-30 passengers',
    luggage: 'Minimal',
    image: null,
  },
];

export default function Fleet() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-fleet-title">Our Fleet</h1>
          <p className="text-xl text-gray-300 max-w-3xl" data-testid="text-fleet-subtitle">
            A diverse collection of luxury vehicles to meet every transportation need. 
            All vehicles are meticulously maintained and cleaned.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <Card key={index} variant="elevated" className="overflow-hidden" data-testid={`vehicle-card-${index}`}>
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 5h8m-4-9v14M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{vehicle.name}</h3>
                  <p className="text-muted-foreground mb-4">{vehicle.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {vehicle.capacity}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {vehicle.luggage}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6" data-testid="text-amenities-title">Standard Amenities</h2>
            <p className="text-muted-foreground mb-8">
              All our vehicles come equipped with premium amenities for your comfort.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Leather Seats', 'Climate Control', 'Bottled Water', 'Phone Chargers', 
                'WiFi Available', 'Privacy Glass', 'Professional Driver', 'GPS Tracking'].map((amenity, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <span className="text-sm font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Find the Perfect Vehicle
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Not sure which vehicle is right for you? Our team can help you choose.
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
