'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import React from 'react';

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Skeleton prevents layout shift; uses CSS var so dark OS preference is respected
        return (
            <div
                aria-hidden="true"
                style={{
                    width: 56,
                    height: 28,
                    borderRadius: 9999,
                    background: 'var(--color-nav-mobile-bg, #e8e8e8)',
                    flexShrink: 0,
                }}
            />
        );
    }

    const isDark = resolvedTheme === 'dark';
    const toggle = () => setTheme(isDark ? 'light' : 'dark');

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: 56,
                height: 28,
                borderRadius: 9999,
                padding: '0 4px',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                background: isDark ? '#1e1e1e' : '#e8e8e8',
                boxShadow: isDark
                    ? '4px 4px 8px #111111, -4px -4px 8px #2e2e2e'
                    : '4px 4px 8px #c8c8c8, -4px -4px 8px #ffffff',
            }}
        >
            {/* Sun icon — logical start position handles RTL automatically */}
            <Sun
                size={13}
                className="absolute start-[6px] z-[1]"
                style={{
                    color: isDark ? '#555555' : '#f59e0b',
                    transition: 'color 0.3s ease',
                }}
            />
            {/* Moon icon — logical end position handles RTL automatically */}
            <Moon
                size={13}
                className="absolute end-[6px] z-[1]"
                style={{
                    color: isDark ? '#a78bfa' : '#aaaaaa',
                    transition: 'color 0.3s ease',
                }}
            />
            {/* Sliding circle — uses transform (GPU-composited) instead of left transition.
                Dark offset = width(56) - circle(22) - right-gap(3) - left-base(3) = 28px */}
            <span
                style={{
                    position: 'absolute',
                    top: 3,
                    insetInlineStart: 3,
                    width: 22,
                    height: 22,
                    borderRadius: 9999,
                    transform: isDark
                        ? typeof document !== 'undefined' && document.documentElement.dir === 'rtl'
                            ? 'translateX(-28px)'
                            : 'translateX(28px)'
                        : 'translateX(0)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: isDark ? '#2a2a2a' : '#ffffff',
                    boxShadow: isDark
                        ? 'inset 2px 2px 4px #111111, inset -2px -2px 4px #3a3a3a'
                        : 'inset 2px 2px 4px #e0e0e0, inset -2px -2px 4px #ffffff, 2px 2px 6px #d0d0d0',
                    zIndex: 2,
                }}
            />
        </button>
    );
}
