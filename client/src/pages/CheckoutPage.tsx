import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const shipping = totalPrice > 500 ? 0 : 49;

  const [form, setForm] = useState({
    fullName: '', street: '', city: '', state: '', pincode: '', phone: '',
  });

  const handleChange = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.street || !form.city || !form.state || !form.pincode || !form.phone) {
      toast({ title: 'Please fill all fields', variant: 'destructive' });
      return;
    }
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="container py-16 text-center animate-fade-in">
        <CheckCircle className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-heading text-3xl font-bold mb-2">Order Placed!</h1>
        <p className="text-muted-foreground mb-2">Order #ORD-{Date.now().toString().slice(-6)}</p>
        <p className="text-muted-foreground mb-6">Thank you for shopping with MudCraft. Your handmade treasures are on the way!</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('/orders')}>Track Order</Button>
          <Button variant="outline" onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6">
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="font-heading text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', field: 'fullName' },
                { label: 'Phone', field: 'phone' },
                { label: 'Street Address', field: 'street' },
                { label: 'City', field: 'city' },
                { label: 'State', field: 'state' },
                { label: 'Pincode', field: 'pincode' },
              ].map(({ label, field }) => (
                <div key={field} className={field === 'street' ? 'sm:col-span-2' : ''}>
                  <Label htmlFor={field}>{label}</Label>
                  <Input id={field} value={(form as any)[field]} onChange={e => handleChange(field, e.target.value)} className="mt-1" />
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto">Place Order</Button>
        </form>

        {/* Summary */}
        <div className="border rounded-lg p-6 bg-card h-fit">
          <h2 className="font-heading text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span>{product.name} × {quantity}</span>
                <span>₹{product.price * quantity}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{totalPrice}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{totalPrice + shipping}</span></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
