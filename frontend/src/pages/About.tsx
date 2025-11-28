import { Layout, Card, CardContent } from '../components';
import { Award, Users, Car, Clock } from 'lucide-react';

const stats = [
  { icon: Clock, value: '15+', label: 'Years of Experience' },
  { icon: Users, value: '50,000+', label: 'Happy Clients' },
  { icon: Car, value: '100+', label: 'Luxury Vehicles' },
  { icon: Award, value: '99%', label: 'Satisfaction Rate' },
];

const values = [
  {
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our service, from vehicle maintenance to customer interaction.',
  },
  {
    title: 'Reliability',
    description: 'Count on us to be there when you need us. Punctuality and dependability are our core commitments.',
  },
  {
    title: 'Safety',
    description: 'Your safety is our top priority. All vehicles are regularly inspected and drivers are thoroughly vetted.',
  },
  {
    title: 'Discretion',
    description: 'We respect your privacy. Professional confidentiality is maintained at all times.',
  },
];

export default function About() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-about-title">About USA Luxury Limo</h1>
          <p className="text-xl text-gray-300 max-w-3xl" data-testid="text-about-subtitle">
            For over 15 years, we've been providing premium luxury transportation services 
            to discerning clients across the United States.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6" data-testid="text-story-title">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded with a vision to redefine luxury transportation, USA Luxury Limo has grown from 
                  a small fleet of premium sedans to become one of the most trusted names in the industry.
                </p>
                <p>
                  Our journey began with a simple belief: everyone deserves to travel in comfort and style. 
                  Today, we maintain that commitment while serving thousands of clients annually.
                </p>
                <p>
                  From corporate executives to celebrities, wedding parties to airport travelers, 
                  we've had the privilege of being part of countless memorable journeys.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center">
              <Car className="w-24 h-24 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6" data-testid={`stat-card-${index}`}>
                <CardContent className="pt-4">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title" data-testid="text-values-title">Our Values</h2>
          <p className="section-subtitle">
            The principles that guide everything we do.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} variant="bordered" className="p-6" data-testid={`value-card-${index}`}>
                <CardContent>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
