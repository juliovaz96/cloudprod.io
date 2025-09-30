import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Building2, Rocket, Scale, Users, ArrowRight,
  CheckCircle, Star, TrendingUp, Shield
} from 'lucide-react';
import { WebsiteLayout } from '../core/layouts';
import { ThemeToggle } from '../core/forms/ThemeToggle';
import { useNavigation } from '../../contexts/NavigationContext';
import { useGuidelines } from '../../contexts/GuidelineContext';

export function SolutionsScreen() {
  const { navigate } = useNavigation();
  const { tokens } = useGuidelines();

  const solutions = [
    {
      icon: Rocket,
      title: 'Startup & Scale-up',
      description: 'Perfect for growing companies that need to move fast without sacrificing quality.',
      features: [
        'Rapid MVP infrastructure',
        'Cost-optimized deployments',
        'Auto-scaling capabilities',
        'Developer-friendly tools'
      ],
      ideal: 'Teams of 5-50 developers',
      gradientClass: tokens.gradients.featureIntegration // Green for growth
    },
    {
      icon: Building2,
      title: 'Enterprise',
      description: 'Comprehensive solutions for large organizations with complex requirements.',
      features: [
        'Multi-cloud governance',
        'Compliance & security',
        'Custom integrations',
        'Dedicated support'
      ],
      ideal: 'Enterprise teams 100+ developers',
      gradientClass: tokens.gradients.featureAutomation // Blue for enterprise
    },
    {
      icon: Users,
      title: 'Digital Agencies',
      description: 'White-label solutions for agencies building infrastructure for multiple clients.',
      features: [
        'Multi-tenant architecture',
        'Client management tools',
        'Branded deployment flows',
        'Revenue sharing options'
      ],
      ideal: 'Agencies with 10+ clients',
      gradientClass: tokens.gradients.featurePerformance // Purple for creativity
    }
  ];

  const industries = [
    {
      name: 'FinTech',
      description: 'Compliant, secure infrastructure for financial services',
      icon: Shield,
      requirements: ['PCI DSS compliance', 'Data encryption', 'Audit trails']
    },
    {
      name: 'Healthcare',
      description: 'HIPAA-compliant infrastructure for health data',
      icon: Shield,
      requirements: ['HIPAA compliance', 'Data residency', 'Access controls']
    },
    {
      name: 'E-commerce',
      description: 'High-performance infrastructure for online retail',
      icon: TrendingUp,
      requirements: ['High availability', 'Peak traffic handling', 'Global CDN']
    },
    {
      name: 'SaaS Platforms',
      description: 'Multi-tenant infrastructure for software companies',
      icon: Scale,
      requirements: ['Multi-tenancy', 'Auto-scaling', 'Monitoring']
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "DevOps Lead at TechCorp",
      content: "CloudProd.AI transformed our deployment process. What used to take weeks now happens in hours.",
      avatar: "👩‍💻",
      company: "TechCorp"
    },
    {
      name: "Mike Rodriguez", 
      role: "CTO at InnovateLabs",
      content: "The AI-generated architectures follow industry best practices better than our manual designs.",
      avatar: "👨‍💼",
      company: "InnovateLabs"
    },
    {
      name: "Dr. Emily Watson",
      role: "Platform Engineer at CloudScale",
      content: "Finally, infrastructure that scales with our business without the complexity overhead.",
      avatar: "👩‍🔬",
      company: "CloudScale"
    }
  ];

  return (
    <WebsiteLayout>
      <div className="min-h-screen bg-background">
        {/* Header with Theme Toggle */}
        <header className="absolute top-0 right-0 z-50 p-6">
          <ThemeToggle />
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className={`absolute inset-0 ${tokens.gradients.heroBackground}`}></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-6">
                <Star className="w-4 h-4 mr-2" />
                Tailored Solutions
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-semibold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Solutions Built for
                <span className="block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Every Industry
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                From startups to enterprises, discover how CloudProd.AI adapts to your unique infrastructure 
                requirements and business goals.
              </p>
              
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 h-auto group"
                onClick={() => navigate('auth')}
              >
                Find Your Solution
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Solutions by Company Size */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                Solutions by Company Size
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Whether you're just starting out or running at enterprise scale, we have the right solution for you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="p-8 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 ${solution.gradientClass}`}></div>
                    
                    <div className="flex items-center mb-6">
                      <div className={`p-3 ${solution.gradientClass} rounded-lg mr-4`}>
                        <solution.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold">{solution.title}</h3>
                        <p className="text-sm text-muted-foreground">{solution.ideal}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {solution.description}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {solution.features.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('pricing')}
                    >
                      Learn More
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                Industry-Specific Solutions
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Built-in compliance, security, and performance optimizations for your industry.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg mr-3">
                        <industry.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{industry.name}</h3>
                        <p className="text-sm text-muted-foreground">{industry.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {industry.requirements.map((requirement) => (
                        <div key={requirement} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                Trusted by Leading Teams
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                See how teams across industries are transforming their infrastructure workflows.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl lg:text-4xl font-semibold mb-6">
                Ready to Build Your Solution?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Get started with a free consultation to discuss your specific infrastructure needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 h-auto"
                  onClick={() => navigate('auth')}
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 h-auto"
                  onClick={() => navigate('pricing')}
                >
                  View Pricing
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </WebsiteLayout>
  );
}