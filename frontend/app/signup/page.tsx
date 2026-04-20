'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, type UserRole } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Eye, EyeOff, Loader2, Check, ChevronRight } from 'lucide-react';

type SignupRole = 'citizen' | 'traffic_officer' | 'review_officer' | 'admin';

const roleOptions: { value: SignupRole; label: string; description: string; icon: string }[] = [
  {
    value: 'citizen',
    label: 'Citizen',
    description: 'Register vehicles, view & pay violations',
    icon: '👤',
  },
  {
    value: 'traffic_officer',
    label: 'Traffic Officer',
    description: 'Issue tickets and manage enforcement',
    icon: '🚓',
  },
  {
    value: 'review_officer',
    label: 'Review Officer',
    description: 'Review and resolve disputes',
    icon: '⚖️',
  },
  {
    value: 'admin',
    label: 'Administrator',
    description: 'Manage system and generate reports',
    icon: '👨‍💼',
  },
];

export default function SignupPage() {
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [selectedRole, setSelectedRole] = useState<SignupRole | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const router = useRouter();

  const handleRoleSelect = (role: SignupRole) => {
    setSelectedRole(role);
    setStep('details');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Full name is required');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Valid email is required');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData.email, formData.password, formData.name, selectedRole as UserRole);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary mb-4">
            <span className="text-2xl">🚗</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Traffic Flow</h1>
          <p className="text-muted-foreground mt-2">Smart Traffic Violation Management</p>
        </div>

        {/* Step 1: Role Selection */}
        {step === 'role' && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Select Your Role</CardTitle>
              <CardDescription>Choose your account type to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roleOptions.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => handleRoleSelect(role.value)}
                    className="w-full p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{role.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {role.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-primary hover:text-primary/90">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Registration Details */}
        {step === 'details' && selectedRole && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Create Your Account</CardTitle>
              <CardDescription>
                Register as {roleOptions.find(r => r.value === selectedRole)?.label}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                    className="bg-background border-input"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                    className="bg-background border-input"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1-555-123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="bg-background border-input"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="At least 6 characters"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      required
                      className="bg-background border-input pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      required
                      className="bg-background border-input pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-input accent-primary mt-0.5"
                    disabled={isLoading}
                    required
                  />
                  <span className="text-muted-foreground">
                    I agree to the{' '}
                    <Link href="#" className="text-primary hover:text-primary/90">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="#" className="text-primary hover:text-primary/90">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* Submit Button */}
                <Button type="submit" disabled={isLoading} className="w-full h-10 text-base font-medium">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              {/* Back Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setStep('role');
                  setError('');
                }}
                className="w-full mt-3"
              >
                Back
              </Button>

              {/* Sign In Link */}
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-primary hover:text-primary/90">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
