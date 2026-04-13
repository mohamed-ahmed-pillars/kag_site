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

    const isDark = resolvedTheme === 'dark';

    const toggle = () => setTheme(isDark ? 'light' : 'dark');

    if (!mounted) {
        // Skeleton to prevent layout shift
        return (
            <div
                aria-hidden="true"
                style={{
                    width: 56,
                    height: 28,
                    borderRadius: 9999,
                    background: '#e8e8e8',
                    flexShrink: 0,
                }}
            />
        );
    }

    return (
        <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
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
                transition: 'background 0.3s ease, box-shadow 0.3s ease',
                background: isDark ? '#1e1e1e' : '#e8e8e8',
                boxShadow: isDark
                    ? '4px 4px 8px #111111, -4px -4px 8px #2e2e2e'
                    : '4px 4px 8px #c8c8c8, -4px -4px 8px #ffffff',
            }}
        >
            {/* Sun icon */}
            <Sun
                size={13}
                style={{
                    position: 'absolute',
                    left: 6,
                    color: isDark ? '#555555' : '#f59e0b',
                    transition: 'color 0.3s ease',
                    zIndex: 1,
                }}
            />
            {/* Moon icon */}
            <Moon
                size={13}
                style={{
                    position: 'absolute',
                    right: 6,
                    color: isDark ? '#a78bfa' : '#aaaaaa',
                    transition: 'color 0.3s ease',
                    zIndex: 1,
                }}
            />
            {/* Sliding circle */}
            <span
                style={{
                    position: 'absolute',
                    top: 3,
                    left: isDark ? 'calc(100% - 25px)' : 3,
                    width: 22,
                    height: 22,
                    borderRadius: 9999,
                    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
