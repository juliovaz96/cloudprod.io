import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { WebsiteLayout } from '../core/layouts';
import { ThemeToggle } from '../core/forms/ThemeToggle';
import { useNavigation } from '../../contexts/NavigationContext';
import { useGuidelines } from '../../contexts/GuidelineContext';
import { cn } from '../ui/utils';

export function HomeScreen() {
  const { navigate } = useNavigation();
  const { copy, layout, typography, components, motion: motionGuidelines, tokens } = useGuidelines();
  const hero = copy.marketing.hero;
  const featuresIntro = copy.marketing.featuresIntro;
  const featureHighlights = copy.marketing.featureHighlights;
  const bottomCta = copy.marketing.bottomCta;

  return (
    <WebsiteLayout>
      <div className="relative min-h-screen">
        <header className="absolute top-0 right-0 z-50 p-6">
          <ThemeToggle />
        </header>

        <section className={cn(layout.marketing.heroSection, layout.marketing.sectionPadding)}>
          <div className={cn('absolute inset-0', tokens.gradients.heroBackground)}></div>
          <div className={cn(layout.marketing.container, 'relative z-10')}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionGuidelines.durations.hero }}
              className={layout.marketing.contentNarrow}
            >
              <div className="flex items-center justify-center mb-6">
                <div className={components.heroBadge}> 
                  {hero.badge}
                </div>
              </div>

              <h1 className={typography.heroTitle}>
                {hero.titleLead}
                <span className={cn('block', typography.heroHighlight)}>
                  {hero.titleHighlight}
                </span>
              </h1>

              <p className={typography.heroDescription}>
                {hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  size="lg" 
                  className={cn(components.primaryButton, components.primaryButtonSurface)}
                  onClick={() => navigate(hero.primaryCta.route)}
                >
                  {hero.primaryCta.label}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className={components.secondaryButton}
                  onClick={() => navigate(hero.secondaryCta.route)}
                >
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className={layout.marketing.container}>
            <div className="text-center mb-16">
              <h2 className={typography.sectionTitle}>{featuresIntro.title}</h2>
              <p className={typography.sectionDescription}>{featuresIntro.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featureHighlights.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: motionGuidelines.durations.section,
                    delay: motionGuidelines.getStagger(index)
                  }}
                >
                  <Card className={cn(components.featureCard, 'border-0', feature.surfaceClass)}>
                    <div className="flex items-center mb-4">
                      <div className={cn('p-3 rounded-xl mr-4 shadow-lg', feature.iconClass)}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-left">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className={cn(layout.marketing.container, 'text-center')}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionGuidelines.durations.section, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className={typography.sectionTitle}>{bottomCta.title}</h2>
              <p className="text-muted-foreground text-lg mb-8">
                {bottomCta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className={cn(components.primaryButton, components.primaryButtonSurface)}
                  onClick={() => navigate(bottomCta.primaryCta.route)}
                >
                  {bottomCta.primaryCta.label}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className={components.secondaryButton}
                  onClick={() => navigate(bottomCta.secondaryCta.route)}
                >
                  {bottomCta.secondaryCta.label}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </WebsiteLayout>
  );
}