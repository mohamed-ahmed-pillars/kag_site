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
                background: isDark ? '#ffffff' : '#111111',
                boxShadow: 'none',
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
                    background: isDark ? '#111111' : '#ffffff',
                    boxShadow: 'none',
                    zIndex: 2,
                }}
            />
        </button>
    );
}
