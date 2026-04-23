import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, HandMetal, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { CATEGORY_LABELS, Category } from '@/types';

const categoryImages: Record<Category, string> = {
  'tea-cups': 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=200&fit=crop',
  'plates': 'https://images.unsplash.com/photo-1610701596007-11502f7f2814?w=300&h=200&fit=crop',
  'water-pots': 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300&h=200&fit=crop',
  'kadai': 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=300&h=200&fit=crop',
  'decorative': 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=300&h=200&fit=crop',
};

const HomePage = () => {
  const featured = getFeaturedProducts();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary py-20 md:py-28">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Handcrafted with Earth,<br />
            <span className="text-primary">Made with Love</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover authentic handmade clay products — tea cups, water pots, kadai &amp; more — crafted by skilled Indian artisans using traditional techniques.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/products">Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/products?category=tea-cups">Explore Tea Cups</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <h2 className="font-heading text-3xl font-bold text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {(Object.entries(CATEGORY_LABELS) as [Category, string][]).map(([key, label]) => (
            <Link
              key={key}
              to={`/products?category=${key}`}
              className="group relative rounded-lg overflow-hidden aspect-[3/2] bg-muted"
            >
              <img src={categoryImages[key]} alt={label} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
              <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/50 transition-colors flex items-center justify-center">
                <span className="font-heading text-lg font-semibold text-primary-foreground">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-heading text-3xl font-bold">Featured Products</h2>
          <Button variant="outline" asChild>
            <Link to="/products">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">Why Choose Handmade?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: '100% Natural', desc: 'Made from pure, chemical-free natural clay sourced responsibly.' },
              { icon: HandMetal, title: 'Artisan Crafted', desc: 'Each piece is handmade by skilled artisans with generations of expertise.' },
              { icon: Truck, title: 'Safe Delivery', desc: 'Carefully packed and delivered to your doorstep with love.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6">
                <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
