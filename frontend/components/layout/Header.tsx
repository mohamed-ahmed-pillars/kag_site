'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import MegaMenu, { type MegaMenuItem } from '@/components/ui/mega-menu';
import { FlowButton } from '@/components/ui/flow-button';
import { LanguageSelectorDropdown } from '@/components/ui/language-selector-dropdown';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
    Package,
    Factory,
    Globe,
    Award,
    Building2,
} from "lucide-react";

export function Header() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);
    const params = useParams();
    const locale = params?.locale || 'en';
    const t = useTranslations('nav');

    const NAV_ITEMS: MegaMenuItem[] = [
        { id: 1, label: t('home'), link: "/" },
        {
            id: 2,
            label: t('products'),
            subMenus: [
                {
                    title: t('ourProducts'),
                    items: [
                        {
                            label: t('ourBrands'),
                            description: t('ourBrandsDesc'),
                            icon: Package,
                            href: "/products",
                        },
                        {
                            label: t('privateLabel'),
                            description: t('privateLabelDesc'),
                            icon: Factory,
                            href: "/#private-label",
                        },
                    ],
                },
            ],
            ctaButton: {
                label: t('viewAllProducts'),
                href: "/products",
            },
        },
        {
            id: 3,
            label: t('company'),
            subMenus: [
                {
                    title: t('aboutKag'),
                    items: [
                        {
                            label: t('aboutUs'),
                            description: t('aboutUsDesc'),
                            icon: Building2,
                            href: "/about",
                        },
                        {
                            label: t('exportServices'),
                            description: t('exportServicesDesc'),
                            icon: Globe,
                            href: "/export",
                        },
                        {
                            label: t('certifications'),
                            description: t('certificationsDesc'),
                            icon: Award,
                            badge: "ISO",
                            href: "/certifications",
                        },
                    ],
                },
                {
                    title: t('resources'),
                    variant: "simple",
                    items: [
                        { label: t('blog'), href: "/blog" },
                        { label: t('contactUs'), href: "/contact" },
                    ],
                },
            ],
            ctaButton: {
                label: t('requestQuote'),
                href: "/quotation",
            },
        },
        { id: 4, label: t('export'), link: "/export" },
        { id: 5, label: t('blog'), link: "/blog" },
    ];

    const mobileLinks = [
        { label: t('home'), href: '/' },
        { label: t('products'), href: '/products' },
        { label: t('privateLabel'), href: '/#private-label' },
        { label: t('aboutUs'), href: '/about' },
        { label: t('export'), href: '/export' },
        { label: t('certifications'), href: '/certifications' },
        { label: t('blog'), href: '/blog' },
        { label: t('contact'), href: '/contact' },
    ];

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const getLocalizedHref = (href: string) => {
        if (href.startsWith('/')) {
            return `/${locale}${href}`;
        }
        return href;
    };

    return (
        <header
            style={{
                backgroundColor: 'var(--color-nav-bg)',
            }}
            className="sticky top-0 z-50 w-full"
        >
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    height: '200%',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    background: 'linear-gradient(to bottom, color-mix(in srgb, var(--color-nav-mobile-bg) 10%, transparent), transparent 50%)',
                    pointerEvents: 'none',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0% 50%, transparent 50% 100%)',
                    maskImage: 'linear-gradient(to bottom, black 0% 50%, transparent 50% 100%)',
                }}
            />
            <nav
                className={cn(
                    'relative flex h-14 w-full items-center justify-between px-4 sm:px-6 md:h-16 md:px-10 lg:px-16 max-w-screen-2xl mx-auto md:transition-all md:ease-out',
                    {
                        'md:px-6': scrolled,
                    },
                )}
            >
                <Link
                    href={getLocalizedHref('/')}
                    aria-label="home"
                    className="flex items-center space-x-2"
                >
                    <Image
                        src="/navbarLogo.svg"
                        alt="KAG Logo"
                        width={120}
                        height={40}
                        className="h-30 w-auto dark:invert"
                        priority
                    />
                </Link>
                <div className="hidden items-center md:flex absolute left-1/2 -translate-x-1/2">
                    <MegaMenu items={NAV_ITEMS} />
                </div>
                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    <Link href={getLocalizedHref('/contact')}>
                        <FlowButton text={t('contactUs')} variant="solid" />
                    </Link>
                </div>
                <Button size="icon" variant="outline" onClick={() => setOpen(!open)} className="md:hidden border-gray-200 dark:border-gray-700">
                    <MenuToggleIcon open={open} className="size-5" duration={300} />
                </Button>
            </nav>

            <div
                className={cn(
                    'sticky top-14 left-0 w-full z-50 flex flex-col overflow-hidden md:hidden shadow-lg',
                    open ? 'block' : 'hidden',
                )}
                style={{
                    backgroundColor: 'var(--color-nav-mobile-bg)',
                }}
            >
                <div
                    data-slot={open ? 'open' : 'closed'}
                    className={cn(
                        'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
                        'flex h-full w-full flex-col justify-between gap-y-4 p-6',
                    )}
                >
                    <div className="grid gap-y-1">
                        {mobileLinks.map((link) => (
                            <Link
                                key={link.label}
                                className={buttonVariants({
                                    variant: 'ghost',
                                    className: 'justify-start text-base',
                                })}
                                href={getLocalizedHref(link.href)}
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{t('language')}</span>
                            <div className="flex items-center gap-3">
                                <ThemeToggle />
                                <LanguageSelectorDropdown />
                            </div>
                        </div>
                        <Link href={getLocalizedHref('/quotation')} onClick={() => setOpen(false)}>
                            <FlowButton text={t('requestQuote')} className="w-full" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
