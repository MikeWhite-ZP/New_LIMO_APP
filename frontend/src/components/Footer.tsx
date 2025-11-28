import { Link } from 'wouter';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6 text-primary" data-testid="text-footer-brand">
              USA Luxury Limo
            </h3>
            <p className="text-gray-400 mb-6">
              Premium luxury transportation services across the United States. 
              Experience comfort, reliability, and professionalism with every ride.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" data-testid="link-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" data-testid="link-instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" data-testid="link-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-services">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-fleet">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-locations">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-booking">
                  Book a Ride
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">Airport Transfers</li>
              <li className="text-gray-400">Corporate Travel</li>
              <li className="text-gray-400">Special Events</li>
              <li className="text-gray-400">Wedding Transportation</li>
              <li className="text-gray-400">Point-to-Point</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-gray-400">24/7 Reservations</p>
                  <a href="tel:+1-800-555-0123" className="text-white hover:text-primary" data-testid="link-footer-phone">
                    1-800-555-0123
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-gray-400">Email Us</p>
                  <a href="mailto:info@usaluxurylimo.com" className="text-white hover:text-primary" data-testid="link-footer-email">
                    info@usaluxurylimo.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-gray-400">Headquarters</p>
                  <p className="text-white">Los Angeles, CA</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p data-testid="text-copyright">&copy; {currentYear} USA Luxury Limo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
