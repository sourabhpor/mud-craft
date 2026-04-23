import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockOrders } from '@/data/orders';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container max-w-3xl py-8 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold mb-8">My Profile</h1>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info"><User className="h-4 w-4 mr-1" /> Info</TabsTrigger>
          <TabsTrigger value="addresses"><MapPin className="h-4 w-4 mr-1" /> Addresses</TabsTrigger>
          <TabsTrigger value="orders"><Package className="h-4 w-4 mr-1" /> Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <div className="border rounded-lg p-6 bg-card space-y-4">
            <div><Label>Name</Label><Input value={user.name} readOnly className="mt-1" /></div>
            <div><Label>Email</Label><Input value={user.email} readOnly className="mt-1" /></div>
            <div><Label>Phone</Label><Input value={user.phone} readOnly className="mt-1" /></div>
          </div>
        </TabsContent>

        <TabsContent value="addresses" className="mt-6">
          <div className="space-y-4">
            {user.addresses.length === 0 ? (
              <p className="text-muted-foreground">No saved addresses.</p>
            ) : (
              user.addresses.map((addr, i) => (
                <div key={i} className="border rounded-lg p-4 bg-card">
                  <p className="font-semibold">{addr.fullName}</p>
                  <p className="text-sm text-muted-foreground">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
                  <p className="text-sm text-muted-foreground">Phone: {addr.phone}</p>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <div className="space-y-4">
            {mockOrders.map(order => (
              <div key={order.id} className="border rounded-lg p-4 bg-card cursor-pointer hover:border-primary transition-colors" onClick={() => navigate(`/orders/${order.id}`)}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date} · {order.items.length} items</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={order.status === 'delivered' ? 'default' : order.status === 'shipped' ? 'secondary' : 'outline'}>
                      {order.status}
                    </Badge>
                    <p className="font-bold mt-1">₹{order.total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
