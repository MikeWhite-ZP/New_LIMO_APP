import { useState } from 'react';
import { Layout, Button, Card, CardContent } from '../components';
import { Calendar, Clock, MapPin, Users, Car, ArrowRight, Check } from 'lucide-react';

const vehicleTypes = [
  { id: 'sedan', name: 'Executive Sedan', capacity: 3, price: '$85' },
  { id: 'suv', name: 'Luxury SUV', capacity: 6, price: '$120' },
  { id: 'limo', name: 'Stretch Limousine', capacity: 8, price: '$200' },
  { id: 'van', name: 'Executive Van', capacity: 14, price: '$175' },
];

const serviceTypes = [
  { id: 'airport', name: 'Airport Transfer' },
  { id: 'pointtopoint', name: 'Point to Point' },
  { id: 'hourly', name: 'Hourly Charter' },
  { id: 'event', name: 'Special Event' },
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    pickupAddress: '',
    dropoffAddress: '',
    pickupDate: '',
    pickupTime: '',
    passengers: '1',
    vehicleType: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  return (
    <Layout>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-booking-title">Book Your Ride</h1>
          <p className="text-xl text-gray-300 max-w-3xl" data-testid="text-booking-subtitle">
            Complete the form below to request a reservation. Our team will confirm your booking shortly.
          </p>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                    data-testid={`step-indicator-${s}`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-24 md:w-32 h-1 mx-2 ${step > s ? 'bg-primary' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
            </div>

            <Card variant="elevated">
              <CardContent className="p-8">
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6" data-testid="text-step1-title">Trip Details</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Service Type</label>
                        <div className="grid grid-cols-2 gap-4">
                          {serviceTypes.map((type) => (
                            <label
                              key={type.id}
                              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                formData.serviceType === type.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              data-testid={`radio-service-${type.id}`}
                            >
                              <input
                                type="radio"
                                name="serviceType"
                                value={type.id}
                                checked={formData.serviceType === type.id}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <span className="font-medium">{type.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="pickupAddress">
                          <MapPin className="w-4 h-4 inline mr-1" /> Pickup Address
                        </label>
                        <input
                          type="text"
                          id="pickupAddress"
                          name="pickupAddress"
                          value={formData.pickupAddress}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter pickup location"
                          data-testid="input-pickup"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="dropoffAddress">
                          <MapPin className="w-4 h-4 inline mr-1" /> Drop-off Address
                        </label>
                        <input
                          type="text"
                          id="dropoffAddress"
                          name="dropoffAddress"
                          value={formData.dropoffAddress}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter destination"
                          data-testid="input-dropoff"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="pickupDate">
                            <Calendar className="w-4 h-4 inline mr-1" /> Pickup Date
                          </label>
                          <input
                            type="date"
                            id="pickupDate"
                            name="pickupDate"
                            value={formData.pickupDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            data-testid="input-date"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="pickupTime">
                            <Clock className="w-4 h-4 inline mr-1" /> Pickup Time
                          </label>
                          <input
                            type="time"
                            id="pickupTime"
                            name="pickupTime"
                            value={formData.pickupTime}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            data-testid="input-time"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="passengers">
                          <Users className="w-4 h-4 inline mr-1" /> Number of Passengers
                        </label>
                        <select
                          id="passengers"
                          name="passengers"
                          value={formData.passengers}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          data-testid="select-passengers"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                          ))}
                          <option value="10+">10+ Passengers</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button onClick={handleNext} data-testid="button-next-step1">
                        Next: Select Vehicle <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6" data-testid="text-step2-title">Select Your Vehicle</h2>
                    <div className="space-y-4">
                      {vehicleTypes.map((vehicle) => (
                        <label
                          key={vehicle.id}
                          className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-colors ${
                            formData.vehicleType === vehicle.id
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          data-testid={`radio-vehicle-${vehicle.id}`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="vehicleType"
                              value={vehicle.id}
                              checked={formData.vehicleType === vehicle.id}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <Car className="w-8 h-8 text-gray-400 mr-4" />
                            <div>
                              <span className="font-semibold">{vehicle.name}</span>
                              <p className="text-sm text-muted-foreground">Up to {vehicle.capacity} passengers</p>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-primary">{vehicle.price}</span>
                        </label>
                      ))}
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Button variant="outline" onClick={handleBack} data-testid="button-back-step2">
                        Back
                      </Button>
                      <Button onClick={handleNext} data-testid="button-next-step2">
                        Next: Contact Info <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6" data-testid="text-step3-title">Contact Information</h2>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
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
                          <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="(555) 123-4567"
                            data-testid="input-phone"
                          />
                        </div>
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

                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="notes">Special Requests (Optional)</label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          placeholder="Car seats needed, flight number, etc."
                          data-testid="textarea-notes"
                        ></textarea>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Button type="button" variant="outline" onClick={handleBack} data-testid="button-back-step3">
                        Back
                      </Button>
                      <Button type="submit" data-testid="button-submit">
                        Submit Request <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                )}

                {step === 4 && (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4" data-testid="text-confirmation">Booking Request Submitted!</h2>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Thank you for your reservation request. Our team will review your booking and 
                      contact you within 1 hour to confirm availability and pricing.
                    </p>
                    <p className="text-sm text-muted-foreground mb-8">
                      Confirmation will be sent to: <strong>{formData.email}</strong>
                    </p>
                    <Button onClick={() => setStep(1)} variant="outline" data-testid="button-new-booking">
                      Make Another Booking
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
