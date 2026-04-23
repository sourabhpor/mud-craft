import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, ShoppingCart, Users, IndianRupee, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { products } from '@/data/products';
import { mockOrders } from '@/data/orders';
import { CATEGORY_LABELS } from '@/types';

const COLORS = ['hsl(20,72%,47%)', 'hsl(25,76%,31%)', 'hsl(30,50%,60%)', 'hsl(20,40%,30%)', 'hsl(30,20%,70%)'];

const salesData = [
  { month: 'Oct', sales: 4200 }, { month: 'Nov', sales: 6800 }, { month: 'Dec', sales: 9200 },
  { month: 'Jan', sales: 7500 }, { month: 'Feb', sales: 8100 }, { month: 'Mar', sales: 10500 },
];

const categoryData = Object.entries(CATEGORY_LABELS).map(([key, label], i) => ({
  name: label,
  value: products.filter(p => p.category === key).length,
}));

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="container py-16 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-4">Login as admin@mudcraft.com to access the dashboard.</p>
        <Button onClick={() => navigate('/login')}>Login as Admin</Button>
      </div>
    );
  }

  const stats = [
    { label: 'Total Orders', value: mockOrders.length, icon: Package, color: 'text-primary' },
    { label: 'Revenue', value: `₹${mockOrders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, icon: IndianRupee, color: 'text-primary' },
    { label: 'Products', value: products.length, icon: ShoppingCart, color: 'text-primary' },
    { label: 'Customers', value: 2, icon: Users, color: 'text-primary' },
  ];

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="border rounded-lg p-5 bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold mt-1">{value}</p>
              </div>
              <Icon className={`h-8 w-8 ${color} opacity-60`} />
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="font-semibold mb-4">Monthly Sales</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,20%,82%)" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="hsl(20,72%,47%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="font-semibold mb-4">Products by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" label={({ name }) => name}>
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        {/* Orders */}
        <TabsContent value="orders" className="mt-6">
          <div className="border rounded-lg bg-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
              </tr></thead>
              <tbody>
                {mockOrders.map(order => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="p-3 font-medium">{order.id}</td>
                    <td className="p-3">{order.address.fullName}</td>
                    <td className="p-3 text-muted-foreground">{order.date}</td>
                    <td className="p-3">₹{order.total}</td>
                    <td className="p-3">
                      <Badge variant={order.status === 'delivered' ? 'default' : order.status === 'shipped' ? 'secondary' : 'outline'}>
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Products */}
        <TabsContent value="products" className="mt-6">
          <div className="border rounded-lg bg-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b">
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Actions</th>
              </tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="p-3"><div className="flex items-center gap-2"><img src={p.image} alt={p.name} className="h-10 w-10 rounded object-cover" /><span className="font-medium">{p.name}</span></div></td>
                    <td className="p-3 text-muted-foreground">{CATEGORY_LABELS[p.category]}</td>
                    <td className="p-3">₹{p.price}</td>
                    <td className="p-3">{p.rating}</td>
                    <td className="p-3"><div className="flex gap-1"><Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
