import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group rounded-lg border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading font-semibold text-card-foreground line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-foreground">₹{product.price}</span>
          <Button size="sm" onClick={() => addToCart(product)}>
            <ShoppingCart className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
