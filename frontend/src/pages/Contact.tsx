import { useState } from 'react';
import { Layout, Button, Card, CardContent } from '../components';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-contact-title">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl" data-testid="text-contact-subtitle">
            Have questions or need a quote? We're here to help. 
            Reach out to our team and we'll get back to you promptly.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card variant="bordered">
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4" data-testid="text-success">Thank You!</h3>
                      <p className="text-muted-foreground">
                        Your message has been received. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <h2 className="text-2xl font-bold mb-6" data-testid="text-form-title">Send Us a Message</h2>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="name">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="John Doe"
                            data-testid="input-name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="john@example.com"
                            data-testid="input-email"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="(555) 123-4567"
                            data-testid="input-phone"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="subject">Subject</label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            data-testid="select-subject"
                          >
                            <option value="">Select a subject</option>
                            <option value="quote">Request a Quote</option>
                            <option value="booking">Booking Inquiry</option>
                            <option value="corporate">Corporate Account</option>
                            <option value="feedback">Feedback</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          placeholder="Tell us about your transportation needs..."
                          data-testid="textarea-message"
                        ></textarea>
                      </div>
                      <Button type="submit" size="lg" className="w-full md:w-auto" data-testid="button-submit">
                        Send Message <Send className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card variant="bordered">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground text-sm mb-2">24/7 Reservations</p>
                      <a href="tel:+1-800-555-0123" className="text-primary font-medium" data-testid="link-phone">
                        1-800-555-0123
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="bordered">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground text-sm mb-2">General Inquiries</p>
                      <a href="mailto:info@usaluxurylimo.com" className="text-primary font-medium" data-testid="link-email">
                        info@usaluxurylimo.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="bordered">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Headquarters</h3>
                      <p className="text-muted-foreground text-sm">
                        123 Luxury Lane<br />
                        Los Angeles, CA 90001
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="bordered">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Hours</h3>
                      <p className="text-muted-foreground text-sm">
                        Reservations: 24/7<br />
                        Office: Mon-Fri 9am-6pm
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
