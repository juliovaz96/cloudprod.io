import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { 
  Layers, Save, Download, Undo, Redo, ZoomIn, ZoomOut,
  Grid, Square, Circle, Database, Server, Globe
} from 'lucide-react';
import { CanvasLayout } from '../core/layouts';
import { useNavigation } from '../../contexts/NavigationContext';
import { useGuidelines } from '../../contexts/GuidelineContext';

export function CanvasScreen() {
  const { navigate } = useNavigation();
  const { tokens } = useGuidelines();

  const tools = [
    { icon: Square, name: 'Container', colorClass: 'bg-blue-100 text-blue-600' },
    { icon: Database, name: 'Database', colorClass: 'bg-green-100 text-green-600' },
    { icon: Server, name: 'Server', colorClass: 'bg-purple-100 text-purple-600' },
    { icon: Globe, name: 'Load Balancer', colorClass: 'bg-orange-100 text-orange-600' },
    { icon: Circle, name: 'Service', colorClass: 'bg-red-100 text-red-600' },
  ];

  return (
    <CanvasLayout>
      <div className="h-full flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-border p-4 bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Architecture Canvas</h1>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Redo className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button variant="outline" size="sm">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Sidebar - Component Palette */}
          <div className="w-64 border-r border-border bg-muted/30 p-4">
            <h2 className="font-semibold mb-4">Components</h2>
            <div className="space-y-2">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-3 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${tool.colorClass}`}>
                        <tool.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{tool.name}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-3">Templates</h3>
              <div className="space-y-2">
                <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-sm">
                    <div className="font-medium">Microservices</div>
                    <div className="text-muted-foreground text-xs">Container-based architecture</div>
                  </div>
                </Card>
                <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-sm">
                    <div className="font-medium">Serverless</div>
                    <div className="text-muted-foreground text-xs">Function-based architecture</div>
                  </div>
                </Card>
                <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-sm">
                    <div className="font-medium">Data Pipeline</div>
                    <div className="text-muted-foreground text-xs">ETL workflow architecture</div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 relative bg-background">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center max-w-md">
                <div className="p-4 bg-muted/30 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Layers className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Design Your Architecture</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Drag and drop components from the sidebar to start building your infrastructure. 
                  Or use AI to generate an initial architecture from your description.
                </p>
                <div className="space-y-3">
                  <Button className="w-full">
                    Generate with AI
                  </Button>
                  <Button variant="outline" className="w-full">
                    Start from Template
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Grid overlay */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />
          </div>

          {/* Properties Panel */}
          <div className="w-64 border-l border-border bg-muted/30 p-4">
            <h2 className="font-semibold mb-4">Properties</h2>
            <div className="text-sm text-muted-foreground">
              Select a component to view its properties and configuration options.
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="border-t border-border p-2 bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>Ready</span>
              <span>•</span>
              <span>0 components</span>
            </div>
            <div>
              Zoom: 100%
            </div>
          </div>
        </div>
      </div>
    </CanvasLayout>
  );
}