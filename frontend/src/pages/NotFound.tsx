export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl mb-4">Page not found</p>
        <a href="/" className="text-primary hover:underline">Return Home</a>
      </div>
    </div>
  );
}
