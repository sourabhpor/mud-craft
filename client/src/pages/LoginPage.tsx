import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(loginForm.email, loginForm.password)) {
      navigate('/');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signup(signupForm.name, signupForm.email, signupForm.password)) {
      navigate('/');
    }
  };

  return (
    <div className="container max-w-md py-16 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold">Welcome to MudCraft</h1>
        <p className="text-muted-foreground mt-2">Sign in to your account or create a new one</p>
      </div>

      <Tabs defaultValue="login" className="border rounded-lg p-6 bg-card">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div><Label htmlFor="login-email">Email</Label><Input id="login-email" type="email" value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} className="mt-1" required /></div>
            <div><Label htmlFor="login-password">Password</Label><Input id="login-password" type="password" value={loginForm.password} onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))} className="mt-1" required /></div>
            <p className="text-xs text-muted-foreground">Demo: use any email. Admin: admin@mudcraft.com</p>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form onSubmit={handleSignup} className="space-y-4 mt-4">
            <div><Label htmlFor="signup-name">Full Name</Label><Input id="signup-name" value={signupForm.name} onChange={e => setSignupForm(p => ({ ...p, name: e.target.value }))} className="mt-1" required /></div>
            <div><Label htmlFor="signup-email">Email</Label><Input id="signup-email" type="email" value={signupForm.email} onChange={e => setSignupForm(p => ({ ...p, email: e.target.value }))} className="mt-1" required /></div>
            <div><Label htmlFor="signup-password">Password</Label><Input id="signup-password" type="password" value={signupForm.password} onChange={e => setSignupForm(p => ({ ...p, password: e.target.value }))} className="mt-1" required /></div>
            <Button type="submit" className="w-full">Create Account</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
