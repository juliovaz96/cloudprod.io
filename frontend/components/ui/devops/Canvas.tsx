import React from 'react';
import { cn } from '../utils';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { Badge } from '../badge';
import { StatusIndicator, StatusLevel } from './StatusIndicator';

export type CanvasNode = {
  id: string;
  label: string;
  position: { x: number; y: number };
  status?: StatusLevel;
  subtitle?: string;
  icon?: React.ElementType;
};

export type CanvasEdge = {
  id: string;
  from: string;
  to: string;
  label?: string;
  status?: 'active' | 'queued' | 'blocked';
};

export type CanvasProps = {
  title?: string;
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  className?: string;
  height?: number;
};

const EDGE_COLORS: Record<NonNullable<CanvasEdge['status']>, string> = {
  active: '#34d399',
  queued: '#fbbf24',
  blocked: '#f87171'
};

export function Canvas({ title = 'Infrastructure Canvas', nodes, edges, className, height = 340 }: CanvasProps) {
  const nodeMap = React.useMemo(() => new Map(nodes.map(node => [node.id, node])), [nodes]);

  return (
    <Card className={cn('border border-border/60 bg-slate-950/70 text-slate-100', className)}>
      <CardHeader className="border-b border-border/40 bg-black/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold uppercase tracking-wide text-slate-200">
            {title}
          </CardTitle>
          <Badge variant="outline" className="border-slate-700/80 text-slate-300">
            {nodes.length} nodes · {edges.length} connections
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative overflow-hidden">
        <div
          className="relative w-full overflow-hidden rounded-lg border border-slate-800 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%2040V0H40%22%20stroke%3D%22%23212A3F%22%20stroke-width%3D%220.5%22%20/%3E%3C/svg%3E')]"
          style={{ height }}
        >
          <svg className="absolute inset-0 h-full w-full" aria-hidden>
            {edges.map(edge => {
              const from = nodeMap.get(edge.from);
              const to = nodeMap.get(edge.to);
              if (!from || !to) return null;
              const stroke = EDGE_COLORS[edge.status ?? 'active'] ?? '#38bdf8';
              const markerId = `arrow-${edge.status ?? 'active'}`;
              return (
                <g key={edge.id} className="animate-in fade-in duration-300">
                  <defs>
                    <marker
                      id={markerId}
                      markerWidth="6"
                      markerHeight="4"
                      refX="6"
                      refY="2"
                      orient="auto"
                    >
                      <path d="M0,0 L0,4 L6,2 z" fill={stroke} />
                    </marker>
                  </defs>
                  <line
                    x1={from.position.x}
                    y1={from.position.y}
                    x2={to.position.x}
                    y2={to.position.y}
                    stroke={stroke}
                    strokeWidth={edge.status === 'blocked' ? 2.5 : 1.5}
                    strokeDasharray={edge.status === 'queued' ? '6 4' : undefined}
                    markerEnd={`url(#${markerId})`}
                  />
                  {edge.label && (
                    <text
                      x={(from.position.x + to.position.x) / 2}
                      y={(from.position.y + to.position.y) / 2 - 6}
                      fill="#cbd5f5"
                      fontSize="10"
                      textAnchor="middle"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {nodes.map(node => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className="group absolute w-52 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-lg backdrop-blur"
                style={{ left: node.position.x, top: node.position.y }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{node.label}</p>
                    {node.subtitle && <p className="text-xs text-slate-400">{node.subtitle}</p>}
                  </div>
                  {node.status && (
                    <StatusIndicator level={node.status} pulse={false} className="px-3 py-1 text-xs" />
                  )}
                </div>
                {Icon && <Icon className="mt-3 size-5 text-slate-400" aria-hidden />}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
