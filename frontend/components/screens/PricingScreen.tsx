import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Check, Star, Zap, Building2, Crown, ArrowRight,
  Users, Cloud, Shield, Headphones
} from 'lucide-react';
import { WebsiteLayout } from '../core/layouts';
import { ThemeToggle } from '../core/forms/ThemeToggle';
import { useNavigation } from '../../contexts/NavigationContext';
import { useGuidelines } from '../../contexts/GuidelineContext';

export function PricingScreen() {
  const { navigate } = useNavigation();
  const { tokens } = useGuidelines();

  const plans = [
    {
      name: 'Starter',
      price: 0,
      period: 'month',
      description: 'Perfect for individual developers and small projects',
      icon: Zap,
      gradientClass: tokens.gradients.featureIntegration, // Green for growth/starter
      popular: false,
      features: [
        '5 infrastructure projects',
        'Basic AI architecture generation',
        'Visual canvas editor',
        'Terraform export',
        'Community support',
        '1 cloud provider'
      ],
      limitations: [
        'Limited to 5 resources per project',
        'Community support only'
      ]
    },
    {
      name: 'Professional',
      price: 49,
      period: 'month',
      description: 'Ideal for growing teams and production workloads',
      icon: Building2,
      gradientClass: tokens.gradients.featureAnalytics, // Brand colors for popular plan
      popular: true,
      features: [
        'Unlimited projects',
        'Advanced AI capabilities',
        'Multi-cloud deployments',
        'All IaC formats (Terraform, CloudFormation, Pulumi)',
        'Priority support',
        'Team collaboration',
        'Advanced security scanning',
        'Compliance templates'
      ],
      limitations: []
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations with complex requirements',
      icon: Crown,
      gradientClass: tokens.gradients.featurePerformance, // Purple for premium/enterprise
      popular: false,
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Dedicated support manager',
        'On-premise deployment',
        'SSO & advanced security',
        'Custom compliance frameworks',
        'Training & onboarding',
        'SLA guarantees'
      ],
      limitations: []
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start.'
    },
    {
      question: 'What cloud providers do you support?',
      answer: 'We support AWS, Azure, Google Cloud, and have beta support for other providers like DigitalOcean and Linode.'
    },
    {
      question: 'Do you offer educational discounts?',
      answer: 'Yes, we offer 50% discounts for students, teachers, and educational institutions. Contact us for details.'
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
                Simple, Transparent Pricing
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-semibold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Choose the Perfect Plan
                <span className="block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  for Your Team
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Start free and scale as you grow. All plans include our core AI-powered infrastructure 
                generation capabilities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <Card className={`p-8 h-full ${plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''} hover:shadow-lg transition-all duration-300`}>
                    <div className="text-center mb-8">
                      <div className={`inline-flex p-3 ${plan.gradientClass} rounded-lg mb-4`}>
                        <plan.icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                      
                      <div className="mb-6">
                        {typeof plan.price === 'number' ? (
                          <div>
                            <span className="text-4xl font-bold">${plan.price}</span>
                            <span className="text-muted-foreground">/{plan.period}</span>
                          </div>
                        ) : (
                          <span className="text-4xl font-bold">{plan.price}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations.map((limitation) => (
                        <div key={limitation} className="flex items-start opacity-60">
                          <div className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground italic">{limitation}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full"
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => navigate('auth')}
                    >
                      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                What's Included
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                All plans include our core features with additional capabilities as you scale.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Cloud className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Multi-Cloud Support</h3>
                  <p className="text-sm text-muted-foreground">Deploy to AWS, Azure, GCP, and more</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Security First</h3>
                  <p className="text-sm text-muted-foreground">Built-in security scanning and compliance</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
                  <p className="text-sm text-muted-foreground">Real-time collaboration on infrastructure</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Headphones className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
                  <p className="text-sm text-muted-foreground">Get help from infrastructure experts</p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Got questions? We have answers.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                >
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
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
              transition={{ delay: 1.4 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl lg:text-4xl font-semibold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Join thousands of developers building better infrastructure with CloudProd.AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 h-auto group"
                  onClick={() => navigate('auth')}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 h-auto"
                  onClick={() => navigate('features')}
                >
                  Explore Features
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </WebsiteLayout>
  );
}