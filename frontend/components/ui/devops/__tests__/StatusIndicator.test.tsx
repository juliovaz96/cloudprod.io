import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusIndicator } from '../StatusIndicator';

describe('StatusIndicator', () => {
  it('renders provided label and latency', () => {
    render(<StatusIndicator level="operational" label="All clear" latencyMs={123} />);
    expect(screen.getByText('All clear')).toBeInTheDocument();
    expect(screen.getByText('123ms latency')).toBeInTheDocument();
  });

  it('falls back to status label when no label provided', () => {
    render(<StatusIndicator level="incident" />);
    expect(screen.getByText(/Incident detected/i)).toBeInTheDocument();
  });
});
