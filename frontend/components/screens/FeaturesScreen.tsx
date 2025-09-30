import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { BrandButton, BrandBadge, FeatureCard } from '../ui/brand-components';
import { 
  Cpu, Cloud, Zap, Shield, Code, Layers, ArrowRight, 
  GitBranch, Monitor, Calendar, Coffee, CheckCircle,
  Sparkles, Target, Workflow
} from 'lucide-react';
import { WebsiteLayout } from '../core/layouts';
import { ThemeToggle } from '../core/forms/ThemeToggle';
import { useNavigation } from '../../contexts/NavigationContext';
import { useGuidelines } from '../../contexts/GuidelineContext';

export function FeaturesScreen() {
  const { navigate } = useNavigation();
  const { tokens } = useGuidelines();

  const features = [
    {
      icon: Cpu,
      title: 'AI-Powered Architecture Generation',
      description: 'Transform natural language descriptions into production-ready cloud architectures using advanced AI models.',
      highlights: ['Natural language processing', 'Architecture best practices', 'Multi-cloud support'],
      gradientClass: tokens.gradients.featureAnalytics
    },
    {
      icon: Layers,
      title: 'Visual Canvas Editor',
      description: 'Intuitive drag-and-drop interface for designing and modifying cloud infrastructure visually.',
      highlights: ['Drag-and-drop interface', 'Real-time validation', 'Component library'],
      gradientClass: tokens.gradients.featureAutomation
    },
    {
      icon: Code,
      title: 'Infrastructure as Code',
      description: 'Automatically generate Terraform, CloudFormation, and Pulumi code from your visual designs.',
      highlights: ['Multi-format export', 'Version control ready', 'Best practices enforced'],
      gradientClass: tokens.gradients.featureIntegration
    },
    {
      icon: Cloud,
      title: 'Multi-Cloud Deployment',
      description: 'Deploy to AWS, Azure, Google Cloud, and other providers with unified workflows.',
      highlights: ['Cross-cloud compatibility', 'Provider optimization', 'Cost management'],
      gradientClass: tokens.gradients.featurePerformance
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Built-in security scanning, compliance checks, and governance policies.',
      highlights: ['Security scanning', 'Compliance frameworks', 'Policy enforcement'],
      gradientClass: tokens.gradients.featureSecurity
    },
    {
      icon: Monitor,
      title: 'Observability Integration',
      description: 'Comprehensive monitoring, logging, and alerting built into every deployment.',
      highlights: ['Performance monitoring', 'Log aggregation', 'Custom dashboards'],
      gradientClass: tokens.gradients.featureMonitoring
    }
  ];

  const useCases = [
    {
      icon: Zap,
      title: 'Rapid Prototyping',
      description: 'Get from idea to infrastructure in minutes, not days',
      metrics: '10x faster deployment'
    },
    {
      icon: Target,
      title: 'Enterprise Migration',
      description: 'Modernize legacy systems with AI-guided architecture',
      metrics: '70% cost reduction'
    },
    {
      icon: Workflow,
      title: 'DevOps Automation',
      description: 'Streamline CI/CD pipelines with intelligent orchestration',
      metrics: '90% less manual work'
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
              <BrandBadge className="mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Comprehensive Platform Features
              </BrandBadge>
              
              <h1 className="text-5xl lg:text-6xl font-semibold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Everything You Need to Build
                <span className="block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Modern Infrastructure
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                From AI-powered design to automated deployment, discover the complete toolkit for 
                next-generation infrastructure development.
              </p>
              
              <BrandButton 
                size="lg" 
                className="text-lg px-8 py-6 h-auto group"
                onClick={() => navigate('auth')}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </motion.div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                Powerful Features for Modern Teams
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Built for developers, DevOps engineers, and platform teams who demand speed, reliability, and scale.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 ${feature.gradientClass} rounded-lg mr-4`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                Built for Every Use Case
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Whether you're a startup or enterprise, CloudProd.AI adapts to your infrastructure needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <useCase.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground mb-4">{useCase.description}</p>
                    <Badge variant="outline" className="text-primary border-primary">
                      {useCase.metrics}
                    </Badge>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl lg:text-4xl font-semibold mb-6">
                Experience the Future of Infrastructure
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Join thousands of developers who have already transformed their deployment workflows.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 h-auto"
                  onClick={() => navigate('auth')}
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 h-auto"
                  onClick={() => navigate('solutions')}
                >
                  View Solutions
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </WebsiteLayout>
  );
}