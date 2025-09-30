import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { ContactModal } from '../../shared/ContactModal';
import { Chatbot } from '../../shared/Chatbot';
import { ArrowRight, Cpu, Cloud, Zap, Shield, Code, Layers, MessageSquare, GitBranch, Monitor, Calendar, Coffee, ExternalLink, Book, ArrowUpRight, TrendingUp, Award, Users2 } from 'lucide-react';
import { motion } from 'motion/react';
import { WebsiteLayout } from '../../core/layouts';
import { ThemeToggle } from '../../core/forms/ThemeToggle';
import { Screen } from '../../../contexts/NavigationContext';

interface HomepageScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HomepageScreen({ onNavigate }: HomepageScreenProps) {
  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [flowProgress, setFlowProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const demoInterval = setInterval(() => {
      setCurrentDemoIndex((prev) => (prev + 1) % 3);
    }, 4000);
    
    const flowInterval = setInterval(() => {
      setFlowProgress((prev) => (prev + 1) % 4);
    }, 2000);

    return () => {
      clearInterval(demoInterval);
      clearInterval(flowInterval);
    };
  }, []);

  const features = [
    {
      icon: MessageSquare,
      title: "Prompt to Prototype",
      description: "Describe your infrastructure needs in natural language and watch as CloudProd.AI generates production-ready architectures.",
      demo: "Natural language → Cloud architecture"
    },
    {
      icon: Layers,
      title: "Visual Canvas",
      description: "Design and configure your infrastructure visually with our intuitive drag-and-drop canvas interface.",
      demo: "Drag, drop, configure → Deploy"
    },
    {
      icon: Cloud,
      title: "Multi-Cloud Ready",
      description: "Deploy seamlessly across AWS, Azure, GCP, and on-premises infrastructure with unified management.",
      demo: "One config → Multiple clouds"
    }
  ];

  const integrations = [
    { name: "AWS", logo: "☁️" },
    { name: "Azure", logo: "🔵" },
    { name: "GCP", logo: "🌐" },
    { name: "Kubernetes", logo: "⚓" },
    { name: "Docker", logo: "🐳" },
    { name: "Terraform", logo: "🏗️" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "DevOps Lead at TechCorp",
      content: "CloudProd.AI reduced our infrastructure deployment time from weeks to hours. The AI-generated architectures are production-ready.",
      avatar: "👩‍💻"
    },
    {
      name: "Mike Rodriguez",
      role: "Platform Engineer at StartupXYZ",
      content: "The visual canvas makes complex infrastructure easy to understand and manage. Our entire team can now contribute to infrastructure decisions.",
      avatar: "👨‍💼"
    },
    {
      name: "Dr. Emily Watson",
      role: "CTO at InnovateLabs",
      content: "From prompt to production in minutes. CloudProd.AI has revolutionized how we approach infrastructure as code.",
      avatar: "👩‍🔬"
    }
  ];

  const useCases = [
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description: "Get from idea to infrastructure in minutes, not days",
      color: "from-primary to-accent"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Built-in security best practices and compliance frameworks",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Code,
      title: "DevOps Automation",
      description: "Streamline your CI/CD pipelines with intelligent automation",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Monitor,
      title: "Observability",
      description: "Comprehensive monitoring and logging out of the box",
      color: "from-purple-500 to-purple-600"
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary">
                  ✨ From Prompt to Production
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-semibold mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Infrastructure Made
                <span className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Intelligent
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform natural language into production-ready cloud infrastructure. 
                Design, deploy, and manage across any cloud with AI-powered automation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => onNavigate('login')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
                >
                  Start Building Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => onNavigate('product-overview')}
                  className="px-8 py-3 text-lg"
                >
                  Watch Demo
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Features Demo */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold mb-4">See CloudProd.AI in Action</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience the power of AI-driven infrastructure development
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isVisible ? 1 : 0, 
                    y: isVisible ? 0 : 20,
                    scale: currentDemoIndex === index ? 1.02 : 1
                  }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`p-8 rounded-2xl border ${
                    currentDemoIndex === index 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-background border-border'
                  } transition-all duration-300`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                    currentDemoIndex === index 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  
                  <div className="bg-muted rounded-lg p-3 text-sm font-mono text-muted-foreground">
                    {feature.demo}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold mb-4">Built for Every Use Case</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From startups to enterprises, CloudProd.AI scales with your infrastructure needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${useCase.color} flex items-center justify-center mb-4`}>
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold mb-4">Works with Your Stack</h2>
              <p className="text-muted-foreground">
                Seamlessly integrate with the tools and platforms you already use
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8">
              {integrations.map((integration, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-background rounded-xl border">
                  <span className="text-2xl">{integration.logo}</span>
                  <span className="font-medium">{integration.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold mb-4">Trusted by Engineering Teams</h2>
              <p className="text-muted-foreground">
                See what developers and DevOps engineers are saying about CloudProd.AI
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{testimonial.avatar}</span>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold mb-4">Ready to Transform Your Infrastructure?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already building smarter infrastructure with CloudProd.AI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => onNavigate('login')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setIsContactModalOpen(true)}
                className="px-8 py-3"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Modal */}
        <ContactModal 
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

        {/* Chatbot */}
        <Chatbot 
          isOpen={isChatbotOpen}
          onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        />
      </div>
    </WebsiteLayout>
  );
}