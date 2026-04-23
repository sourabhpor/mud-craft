import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Star, Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { CATEGORY_LABELS } from '@/types';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="font-heading text-2xl mb-4">Product not found</h1>
        <Button asChild><Link to="/products">Back to Shop</Link></Button>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container py-8 animate-fade-in">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/products"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop</Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        {/* Info */}
        <div>
          <Badge variant="secondary">{CATEGORY_LABELS[product.category]}</Badge>
          <h1 className="font-heading text-3xl font-bold mt-2">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
          </div>
          <p className="text-3xl font-bold mt-4">₹{product.price}</p>
          <p className="text-muted-foreground mt-4 leading-relaxed">{product.description}</p>

          {/* Specs */}
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Specifications</h3>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-muted-foreground">{key}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Add to cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
            <Button size="lg" onClick={() => addToCart(product, quantity)} className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
