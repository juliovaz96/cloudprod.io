import React from 'react';
import { cn } from '../utils';
import { Card, CardContent, CardHeader, CardTitle } from '../card';

export type DiffLineType = 'context' | 'added' | 'removed' | 'modified-header';

export type DiffLine = {
  type: DiffLineType;
  content: string;
  lineNumber?: { left?: number; right?: number };
};

export type DiffViewerProps = {
  title?: string;
  lines: DiffLine[];
  className?: string;
};

const LINE_STYLES: Record<DiffLineType, string> = {
  context: 'bg-background',
  added: 'bg-emerald-500/10 text-emerald-300',
  removed: 'bg-rose-500/10 text-rose-300',
  'modified-header': 'bg-slate-900 text-slate-200 font-semibold'
};

const SIGN_MAP: Record<DiffLineType, string> = {
  context: ' ',
  added: '+',
  removed: '-',
  'modified-header': '@'
};

function formatLineNumber(value?: number) {
  if (typeof value !== 'number') return '';
  return value.toString().padStart(4, ' ');
}

export function DiffViewer({ title = 'Changes', lines, className }: DiffViewerProps) {
  return (
    <Card className={cn('overflow-hidden border border-border/60 bg-slate-950/70 text-slate-100', className)}>
      <CardHeader className="border-b border-border/40 bg-black/40">
        <CardTitle className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <pre className="grid max-h-[360px] grid-cols-[80px,80px,40px,1fr] overflow-auto font-mono text-[13px] leading-relaxed">
          {lines.map((line, index) => (
            <React.Fragment key={`${line.type}-${index}-${line.content}`}>
              <span className={cn('border-b border-slate-900 px-3 py-1 text-right text-slate-600', LINE_STYLES[line.type])}>
                {formatLineNumber(line.lineNumber?.left)}
              </span>
              <span className={cn('border-b border-slate-900 px-3 py-1 text-right text-slate-600', LINE_STYLES[line.type])}>
                {formatLineNumber(line.lineNumber?.right)}
              </span>
              <span className={cn('border-b border-slate-900 px-3 py-1 text-center text-slate-600', LINE_STYLES[line.type])}>
                {SIGN_MAP[line.type]}
              </span>
              <code className={cn('border-b border-slate-900 px-4 py-1 whitespace-pre-wrap', LINE_STYLES[line.type])}>
                {line.content}
              </code>
            </React.Fragment>
          ))}
        </pre>
      </CardContent>
    </Card>
  );
}
