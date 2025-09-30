/**
 * CloudProd.AI Brand Components - Phase 3
 * Enhanced component utilities for logo-aligned design system
 */

import React from 'react';
import { Button } from './button';
import { Badge } from './badge';
import { Card } from './card';
import { cn } from './utils';
import { useGuidelines } from '../../contexts/GuidelineContext';

// Brand Button Components
export function BrandButton({ children, className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="brand" className={cn(className)} {...props}>
      {children}
    </Button>
  );
}

export function BrandOutlineButton({ children, className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="brand-outline" className={cn(className)} {...props}>
      {children}
    </Button>
  );
}

export function FeatureButton({ children, className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="feature" className={cn(className)} {...props}>
      {children}
    </Button>
  );
}

// Brand Badge Components
export function BrandBadge({ children, className, ...props }: React.ComponentProps<typeof Badge>) {
  return (
    <Badge variant="brand" className={cn(className)} {...props}>
      {children}
    </Badge>
  );
}

export function FeatureBadge({ children, className, ...props }: React.ComponentProps<typeof Badge>) {
  return (
    <Badge variant="feature" className={cn(className)} {...props}>
      {children}
    </Badge>
  );
}

export function StatusBadge({ children, className, ...props }: React.ComponentProps<typeof Badge>) {
  return (
    <Badge variant="success" className={cn(className)} {...props}>
      {children}
    </Badge>
  );
}

// Brand Card Components
interface BrandCardProps extends React.ComponentProps<typeof Card> {
  variant?: 'brand' | 'feature' | 'interactive' | 'elevated';
}

export function BrandCard({ children, className, variant = 'brand', ...props }: BrandCardProps) {
  const variantClasses = {
    brand: 'border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10',
    feature: 'border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/30',
    interactive: 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer',
    elevated: 'shadow-lg border-border/30 bg-card/95 backdrop-blur',
  };

  return (
    <Card 
      className={cn(variantClasses[variant], className)} 
      tone={variant === 'brand' ? 'brand-orange' : variant === 'feature' ? 'feature' : undefined}
      interactive={variant === 'interactive'}
      {...props}
    >
      {children}
    </Card>
  );
}

// Feature Card with Icon
interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient?: string;
  children?: React.ReactNode;
  className?: string;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  children, 
  className 
}: FeatureCardProps) {
  const { tokens } = useGuidelines();
  
  return (
    <BrandCard variant="interactive" className={cn("p-6 h-full", className)}>
      <div className="flex items-start space-x-4 mb-4">
        <div className={cn(
          "p-3 rounded-lg shrink-0",
          gradient || tokens.gradients.featureAnalytics
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      {children}
    </BrandCard>
  );
}

// Pricing Card Component
interface PricingCardProps {
  name: string;
  price: number | string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  onSelect?: () => void;
  className?: string;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  popular = false,
  icon: Icon,
  onSelect,
  className
}: PricingCardProps) {
  const { tokens } = useGuidelines();
  
  return (
    <BrandCard 
      variant={popular ? "elevated" : "interactive"}
      className={cn(
        "p-6 text-center",
        popular && "ring-2 ring-orange-500 scale-105 shadow-orange-500/20",
        className
      )}
    >
      {popular && (
        <BrandBadge className="mb-4">Most Popular</BrandBadge>
      )}
      
      {Icon && (
        <div className={cn(
          "inline-flex p-3 rounded-lg mb-4",
          popular ? tokens.gradients.featureAnalytics : tokens.gradients.featureIntegration
        )}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      )}
      
      <h3 className="text-2xl font-semibold mb-2">{name}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      
      <div className="mb-6">
        <div className="text-4xl font-bold">
          {typeof price === 'number' ? `$${price}` : price}
          {period && <span className="text-lg font-normal text-muted-foreground">/{period}</span>}
        </div>
      </div>
      
      <ul className="space-y-2 mb-6 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-left">
            <div className="h-2 w-2 bg-green-500 rounded-full mr-3 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      {popular ? (
        <BrandButton onClick={onSelect} className="w-full">
          Get Started
        </BrandButton>
      ) : (
        <BrandOutlineButton onClick={onSelect} className="w-full">
          Choose Plan
        </BrandOutlineButton>
      )}
    </BrandCard>
  );
}

// Solution Card Component  
interface SolutionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  gradient?: string;
  className?: string;
}

export function SolutionCard({
  icon: Icon,
  title,
  description,
  features,
  gradient,
  className
}: SolutionCardProps) {
  const { tokens } = useGuidelines();
  
  return (
    <BrandCard variant="interactive" className={cn("p-6 h-full relative overflow-hidden", className)}>
      {/* Gradient accent bar */}
      <div className={cn(
        "absolute top-0 left-0 w-full h-1", 
        gradient || tokens.gradients.featureAnalytics
      )} />
      
      <div className="flex items-center space-x-4 mb-4">
        <div className={cn(
          "p-3 rounded-lg",
          gradient || tokens.gradients.featureAnalytics
        )}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm">
            <div className="h-2 w-2 bg-green-500 rounded-full mr-3 mt-2 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </BrandCard>
  );
}