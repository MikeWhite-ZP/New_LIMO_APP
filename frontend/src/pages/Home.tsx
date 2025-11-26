export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">USA Luxury Limo</h1>
          <nav className="mt-4 space-x-6">
            <a href="/" className="hover:underline">Home</a>
            <a href="/about" className="hover:underline">About</a>
            <a href="/services" className="hover:underline">Services</a>
            <a href="/fleet" className="hover:underline">Fleet</a>
            <a href="/locations" className="hover:underline">Locations</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/booking" className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100">Book Now</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6">Premium Luxury Transportation</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Experience the finest chauffeur services with our fleet of luxury vehicles.
              Professional drivers, impeccable service, and unmatched comfort.
            </p>
            <a 
              href="/booking" 
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 inline-block"
              data-testid="button-book-now"
            >
              Book Your Ride
            </a>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Why Choose Us</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-primary text-5xl mb-4">🚗</div>
                <h4 className="text-xl font-semibold mb-2">Luxury Fleet</h4>
                <p className="text-muted-foreground">Top-tier vehicles maintained to perfection</p>
              </div>
              <div className="text-center">
                <div className="text-primary text-5xl mb-4">👔</div>
                <h4 className="text-xl font-semibold mb-2">Professional Drivers</h4>
                <p className="text-muted-foreground">Experienced, courteous, and reliable chauffeurs</p>
              </div>
              <div className="text-center">
                <div className="text-primary text-5xl mb-4">⭐</div>
                <h4 className="text-xl font-semibold mb-2">24/7 Service</h4>
                <p className="text-muted-foreground">Available whenever you need us, day or night</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 USA Luxury Limo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
