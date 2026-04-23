import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const shipping = totalPrice > 500 ? 0 : 49;

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center animate-fade-in">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="font-heading text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some beautiful handmade products!</p>
        <Button asChild><Link to="/products">Start Shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 border rounded-lg p-4 bg-card">
              <img src={product.image} alt={product.name} className="h-24 w-24 rounded-md object-cover" />
              <div className="flex-1">
                <Link to={`/product/${product.id}`} className="font-heading font-semibold hover:text-primary">{product.name}</Link>
                <p className="text-sm text-muted-foreground mt-1">₹{product.price} each</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}><Minus className="h-3 w-3" /></Button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}><Plus className="h-3 w-3" /></Button>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeFromCart(product.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="font-bold">₹{product.price * quantity}</div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border rounded-lg p-6 bg-card h-fit">
          <h2 className="font-heading text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{totalPrice}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
            {shipping > 0 && <p className="text-xs text-muted-foreground">Free shipping on orders over ₹500</p>}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span><span>₹{totalPrice + shipping}</span>
          </div>
          <Button className="w-full mt-6" size="lg" onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
