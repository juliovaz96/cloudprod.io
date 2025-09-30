import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { GuidelineProvider, useGuidelines, defaultGuidelines } from '../GuidelineContext';

describe('GuidelineContext', () => {
  it('provides default guideline values', () => {
    const { result } = renderHook(() => useGuidelines(), {
      wrapper: ({ children }) => <GuidelineProvider>{children}</GuidelineProvider>
    });

    expect(result.current.copy.marketing.hero.badge).toBe(
      defaultGuidelines.copy.marketing.hero.badge
    );
    expect(result.current.utils.getSpacing(4)).toBe('16px');
  });

  it('allows overriding values via provider', () => {
    const { result } = renderHook(() => useGuidelines(), {
      wrapper: ({ children }) => (
        <GuidelineProvider
          value={{
            copy: {
              marketing: {
                hero: {
                  badge: '🚀 Launch production pipelines faster'
                }
              }
            }
          }}
        >
          {children}
        </GuidelineProvider>
      )
    });

    expect(result.current.copy.marketing.hero.badge).toBe(
      '🚀 Launch production pipelines faster'
    );
  });
});
