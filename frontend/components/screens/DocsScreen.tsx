import React from 'react';
import { motion } from 'motion/react';
import { Book, Search, ArrowRight, Code, FileText, Video, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { WebsiteLayout } from '../core/layouts';
import { ThemeToggle } from '../core/forms/ThemeToggle';
import { useNavigation } from '../../contexts/NavigationContext';
import { useGuidelines } from '../../contexts/GuidelineContext';
import { cn } from '../ui/utils';

export function DocsScreen() {
  const { navigate } = useNavigation();
  const { copy, layout, typography, components, motion: motionGuidelines, tokens } = useGuidelines();
  const documentation = copy.documentation;

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
              className={cn(layout.marketing.contentNarrow, 'text-center')}
            >
              <Badge className={cn(components.heroBadge, 'flex items-center justify-center gap-2 w-fit mx-auto')}>
                <Book className="w-4 h-4" />
                {documentation.hero.badge}
              </Badge>

              <h1 className={cn(typography.heroTitle, 'mx-auto text-balance')}>
                {documentation.hero.titleLead}
                <span className={cn('block', typography.heroHighlight)}>
                  {documentation.hero.titleHighlight}
                </span>
              </h1>
              
              <p className={typography.heroDescription}>
                {documentation.hero.description}
              </p>
              
              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={documentation.hero.searchPlaceholder}
                    className={components.searchInput}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className={layout.marketing.container}>
            <div className="text-center mb-16">
              <h2 className={typography.sectionTitle}>Quick Start Guides</h2>
              <p className={typography.sectionDescription}>
                Get up and running in minutes with our step-by-step guides.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {documentation.quickStart.map((guide, index) => (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: motionGuidelines.durations.section,
                    delay: motionGuidelines.getStagger(index)
                  }}
                >
                  <Card className={components.documentationCard}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn('p-3 rounded-lg', guide.iconSurfaceClass)}>
                        <guide.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline">{guide.duration}</Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {guide.description}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium">
                      <span>Read Guide</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className={layout.marketing.container}>
            <div className="text-center mb-16">
              <h2 className={typography.sectionTitle}>Documentation</h2>
              <p className={typography.sectionDescription}>
                Comprehensive documentation covering all aspects of the platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {documentation.categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: motionGuidelines.durations.section,
                    delay: 0.3 + motionGuidelines.getStagger(index)
                  }}
                >
                  <Card className={components.documentationCategoryCard}>
                    <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center">
                            {item.type === 'api' ? (
                              <Code className="h-4 w-4 text-blue-500 mr-3" />
                            ) : (
                              <FileText className="h-4 w-4 text-green-500 mr-3" />
                            )}
                            <span className="text-sm font-medium">{item.title}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className={layout.marketing.container}>
            <div className="text-center mb-16">
              <h2 className={typography.sectionTitle}>Featured Tutorials</h2>
              <p className={typography.sectionDescription}>
                In-depth tutorials to help you master advanced concepts and workflows.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {documentation.tutorials.map((tutorial, index) => (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: motionGuidelines.durations.element,
                    delay: 0.7 + motionGuidelines.getStagger(index)
                  }}
                >
                  <Card className={components.documentationTutorialCard}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {tutorial.type === 'video' ? (
                          <Video className="h-5 w-5 text-red-500 mr-2" />
                        ) : (
                          <FileText className="h-5 w-5 text-blue-500 mr-2" />
                        )}
                        <Badge variant="outline">{tutorial.difficulty}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{tutorial.duration}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">{tutorial.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {tutorial.description}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium text-sm">
                      <span>Start Tutorial</span>
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className={cn(layout.marketing.container, 'text-center')}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionGuidelines.durations.section, delay: 1.0 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className={typography.sectionTitle}>{documentation.cta.title}</h2>
              <p className="text-muted-foreground text-lg mb-8">
                {documentation.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className={cn(components.primaryButton, components.primaryButtonSurface)}
                  onClick={() => navigate(documentation.cta.primaryCta.route)}
                >
                  {documentation.cta.primaryCta.label}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className={components.secondaryButton}
                  onClick={() => navigate(documentation.cta.secondaryCta.route)}
                >
                  {documentation.cta.secondaryCta.label}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </WebsiteLayout>
  );
}