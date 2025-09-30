import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowRight, Github, Mail, Lock, User, Eye, EyeOff,
  Shield, Zap, CheckCircle
} from 'lucide-react';
import { WebsiteLayout } from '../core/layouts';
import { ThemeToggle } from '../core/forms/ThemeToggle';
import { useNavigation } from '../../contexts/NavigationContext';
import { useGuidelines } from '../../contexts/GuidelineContext';

export function AuthScreen() {
  const { navigate } = useNavigation();
  const { tokens } = useGuidelines();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (type: 'login' | 'signup') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // For demo purposes, navigate to dashboard
    navigate('dashboard');
  };

  const benefits = [
    {
      icon: Zap,
      title: 'Get Started in Minutes',
      description: 'Create your first infrastructure project in under 5 minutes'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC2 compliant with enterprise-grade security features'
    },
    {
      icon: CheckCircle,
      title: 'No Credit Card Required',
      description: 'Start with our free tier and upgrade when you\'re ready'
    }
  ];

  return (
    <WebsiteLayout>
      <div className="min-h-screen bg-background">
        {/* Header with Theme Toggle */}
        <header className="absolute top-0 right-0 z-50 p-6">
          <ThemeToggle />
        </header>

        <div className="min-h-screen flex items-center justify-center py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
              
              {/* Left Side - Benefits */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl lg:text-5xl font-semibold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Join Thousands of
                    <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Infrastructure Innovators
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Start building smarter infrastructure with AI-powered design and automated deployments.
                  </p>
                </div>

                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-xl flex-shrink-0 shadow-lg">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-muted-foreground text-sm">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    Already have an account?{' '}
                    <button 
                      className="text-primary hover:underline"
                      onClick={() => navigate('home')}
                    >
                      Back to Home
                    </button>
                  </p>
                </div>
              </motion.div>

              {/* Right Side - Auth Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="p-8 shadow-lg">
                  <Tabs defaultValue="signup" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                      <TabsTrigger value="login">Log In</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="signup" className="space-y-6 mt-6">
                      <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">Create Your Account</h2>
                        <p className="text-muted-foreground">Start your infrastructure journey today</p>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="john@company.com" />
                        </div>
                        
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Input 
                              id="password" 
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a strong password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border-0 shadow-lg" 
                        size="lg"
                        onClick={() => handleAuth('signup')}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Mail className="mr-2 h-4 w-4" />
                          Google
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="login" className="space-y-6 mt-6">
                      <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>
                        <p className="text-muted-foreground">Sign in to your account</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="loginEmail">Email</Label>
                          <Input id="loginEmail" type="email" placeholder="john@company.com" />
                        </div>
                        
                        <div>
                          <Label htmlFor="loginPassword">Password</Label>
                          <div className="relative">
                            <Input 
                              id="loginPassword" 
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <a href="#" className="text-primary hover:underline">
                              Forgot your password?
                            </a>
                          </div>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border-0 shadow-lg" 
                        size="lg"
                        onClick={() => handleAuth('login')}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Mail className="mr-2 h-4 w-4" />
                          Google
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 text-xs text-center text-muted-foreground">
                    By continuing, you agree to our{' '}
                    <a href="#" className="underline hover:text-foreground">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="underline hover:text-foreground">Privacy Policy</a>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}