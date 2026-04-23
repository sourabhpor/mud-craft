import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t bg-card mt-16">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-primary mb-3">MudCraft</h3>
          <p className="text-sm text-muted-foreground">Handcrafted with Earth, Made with Love. Premium handmade clay products from skilled Indian artisans.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/products" className="hover:text-primary">Shop All</Link>
            <Link to="/products?category=tea-cups" className="hover:text-primary">Tea Cups</Link>
            <Link to="/products?category=water-pots" className="hover:text-primary">Water Pots</Link>
            <Link to="/products?category=kadai" className="hover:text-primary">Kadai</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Help</h4>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/orders" className="hover:text-primary">Track Order</Link>
            <Link to="/profile" className="hover:text-primary">My Account</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>info@mudcraft.com</p>
            <p>+91 98765 43210</p>
            <p>Jaipur, Rajasthan, India</p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
        © 2025 MudCraft. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
