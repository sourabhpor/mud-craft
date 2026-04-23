import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Truck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockOrders } from '@/data/orders';

const OrdersPage = () => {
  const { id } = useParams();

  if (id) {
    const order = mockOrders.find(o => o.id === id);
    if (!order) return <div className="container py-16 text-center"><h1 className="font-heading text-2xl">Order not found</h1></div>;

    return (
      <div className="container max-w-3xl py-8 animate-fade-in">
        <Button variant="ghost" asChild className="mb-6"><Link to="/orders"><ArrowLeft className="mr-2 h-4 w-4" /> All Orders</Link></Button>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="font-heading text-2xl font-bold">{order.id}</h1>
            <p className="text-muted-foreground">{order.date}</p>
          </div>
          <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
        </div>

        {/* Timeline */}
        <div className="border rounded-lg p-6 bg-card mb-6">
          <h2 className="font-semibold mb-4">Tracking</h2>
          <div className="space-y-4">
            {order.trackingUpdates.map((update, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {i === order.trackingUpdates.length - 1 ? (
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  {i < order.trackingUpdates.length - 1 && <div className="w-px h-full bg-border mt-1" />}
                </div>
                <div>
                  <p className="font-medium text-sm">{update.status}</p>
                  <p className="text-xs text-muted-foreground">{update.date}</p>
                  <p className="text-sm text-muted-foreground">{update.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="font-semibold mb-4">Items</h2>
          <div className="space-y-3">
            {order.items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3 items-center">
                <img src={product.image} alt={product.name} className="h-14 w-14 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                </div>
                <span className="font-semibold">₹{product.price * quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t flex justify-between font-bold">
            <span>Total</span><span>₹{order.total}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-8 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-4">
        {mockOrders.map(order => (
          <Link key={order.id} to={`/orders/${order.id}`} className="block border rounded-lg p-4 bg-card hover:border-primary transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date} · {order.items.length} item(s)</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={order.status === 'delivered' ? 'default' : order.status === 'shipped' ? 'secondary' : 'outline'}>
                  {order.status}
                </Badge>
                <p className="font-bold mt-1">₹{order.total}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
