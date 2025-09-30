import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Badge } from '../badge';
import { ScrollArea } from '../scroll-area';
import { Switch } from '../switch';
import { cn } from '../utils';

export type LogLevel = 'info' | 'debug' | 'warn' | 'error';

export type LogEntry = {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
  source?: string;
};

export type LogViewerProps = {
  entries: LogEntry[];
  onLoadMore?: () => void;
  searchPlaceholder?: string;
  defaultQuery?: string;
  defaultAutoscroll?: boolean;
  className?: string;
  emptyState?: React.ReactNode;
};

const LEVEL_STYLES: Record<LogLevel, string> = {
  info: 'text-slate-300 border-slate-700',
  debug: 'text-sky-300 border-sky-700',
  warn: 'text-amber-300 border-amber-600',
  error: 'text-red-300 border-red-600'
};

const LEVEL_LABELS: Record<LogLevel, string> = {
  info: 'Info',
  debug: 'Debug',
  warn: 'Warning',
  error: 'Error'
};

export function LogViewer({
  entries,
  onLoadMore,
  searchPlaceholder = 'Filter logs (regex supported)',
  defaultQuery = '',
  defaultAutoscroll = true,
  className,
  emptyState
}: LogViewerProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [showTimestamps, setShowTimestamps] = useState(true);
  const [autoscroll, setAutoscroll] = useState(defaultAutoscroll);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const filteredEntries = useMemo(() => {
    if (!query) return entries;

    try {
      const regex = new RegExp(query, 'i');
      return entries.filter(entry =>
        regex.test(entry.message) ||
        regex.test(entry.timestamp) ||
        (entry.source ? regex.test(entry.source) : false)
      );
    } catch (error) {
      const lowered = query.toLowerCase();
      return entries.filter(entry =>
        entry.message.toLowerCase().includes(lowered) ||
        (entry.source?.toLowerCase().includes(lowered) ?? false)
      );
    }
  }, [entries, query]);

  useEffect(() => {
    if (!autoscroll) return;
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [filteredEntries, autoscroll]);

  const renderEntry = (entry: LogEntry) => (
    <li
      key={entry.id}
      className={cn(
        'grid grid-cols-[auto,1fr] items-start gap-3 border-l-2 border-transparent bg-black/30 px-4 py-2 text-xs font-mono tracking-tight text-slate-200',
        LEVEL_STYLES[entry.level]
      )}
    >
      {showTimestamps && (
        <time className="text-slate-500">{entry.timestamp}</time>
      )}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-current text-[10px] uppercase tracking-wide">
            {LEVEL_LABELS[entry.level]}
          </Badge>
          {entry.source && (
            <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
              {entry.source}
            </span>
          )}
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-100">{entry.message}</p>
      </div>
    </li>
  );

  return (
    <div className={cn('rounded-xl border border-border/50 bg-[#0b1120] text-left shadow-inner', className)}>
      <div className="flex flex-wrap items-center gap-3 border-b border-border/30 px-4 py-3">
        <div className="flex flex-1 items-center gap-2">
          <Input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="border-slate-700 bg-black/30 text-sm text-slate-100 placeholder:text-slate-500"
          />
          <Button variant="outline" size="sm" onClick={() => setQuery('')} className="border-slate-700/60 text-slate-200">
            Clear
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span>Autoscroll</span>
          <Switch checked={autoscroll} onCheckedChange={setAutoscroll} />
          <span>Timestamps</span>
          <Switch checked={showTimestamps} onCheckedChange={setShowTimestamps} />
        </div>
      </div>
      <ScrollArea className="h-[320px]">
        <div ref={viewportRef} className="max-h-[320px] overflow-auto">
          <ul className="divide-y divide-slate-800">
            {filteredEntries.length > 0
              ? filteredEntries.map(renderEntry)
              : (
                <li className="px-4 py-8 text-center text-sm text-slate-400">
                  {emptyState ?? 'No log entries match your filters.'}
                </li>
              )}
          </ul>
        </div>
      </ScrollArea>
      {onLoadMore && (
        <div className="border-t border-slate-800/80 px-4 py-3">
          <Button variant="secondary" className="w-full bg-white/5 text-slate-200 hover:bg-white/10" onClick={onLoadMore}>
            Load older logs
          </Button>
        </div>
      )}
    </div>
  );
}
