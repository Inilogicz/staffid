// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react'; // <-- Import the loader icon

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/'); // Redirect to dashboard on successful login
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // The AuthLayout component will handle the centering
    <Card className="mx-auto max-w-sm w-full border-none shadow-none sm:border sm:shadow-lg">
      <CardHeader className="text-center"> {/* <-- Centered the header text */}
        {/* You can replace this with your actual logo */}
        <div className="flex justify-center mb-4">
          <img src="/assets/church_logo-1.png" alt="DCLM Logo" className="h-16 w-16" />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to the ID Card Management System
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4"> {/* <-- Changed to space-y-4 for better spacing */}
          <div className="space-y-2"> {/* <-- Grouped label and input */}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@dclm.org"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="h-10" // Standardized height
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* "Forgot Password?" Link */}
              <Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="h-10"
            />
          </div>

          {/* Error message styling */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full h-10 font-semibold" disabled={loading}>
            {/* Conditional rendering for the loading state */}
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
        
        {/* Optional: Add a subtle footer */}
        <div className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Request Access
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;