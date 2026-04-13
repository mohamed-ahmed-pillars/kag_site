"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";
import { LanguageSelectorDropdown } from "@/components/ui/language-selector-dropdown";
import { useParams, useRouter } from "next/navigation";

export type MegaMenuItem = {
  id: number;
  label: string;
  subMenus?: {
    title: string;
    variant?: "detailed" | "simple";
    items: {
      label: string;
      description?: string;
      icon?: React.ElementType;
      badge?: string;
      notificationCount?: number;
      href?: string;
    }[];
  }[];
  ctaButton?: {
    label: string;
    href: string;
  };
  link?: string;
};

export interface MegaMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: MegaMenuItem[];
  className?: string;
}

const MegaMenu = React.forwardRef<HTMLUListElement, MegaMenuProps>(
  ({ items, className, ...props }, ref) => {
    const [openMenu, setOpenMenu] = React.useState<string | null>(null);
    const [isHover, setIsHover] = React.useState<number | null>(null);
    const params = useParams();
    const locale = params?.locale || "en";
    const router = useRouter();

    const handleHover = (menuLabel: string | null) => {
      setOpenMenu(menuLabel);
    };

    const getLocalizedHref = (href: string) => {
      if (href.startsWith("/")) {
        return `/${locale}${href}`;
      }
      return href;
    };

    return (
      <ul
        ref={ref}
        className={`relative flex items-center space-x-0 ${className || ""}`}
        {...props}
      >
        {items.map((navItem) => (
          <li
            key={navItem.label}
            className="relative"
            onMouseEnter={() => handleHover(navItem.label)}
            onMouseLeave={() => handleHover(null)}
          >
            {navItem.link ? (
              <a
                href={getLocalizedHref(navItem.link)}
                className="relative flex cursor-pointer items-center justify-center gap-1 py-1.5 px-4 text-sm font-medium text-black dark:text-white transition-colors duration-300 hover:text-black dark:hover:text-white group"
                onMouseEnter={() => setIsHover(navItem.id)}
                onMouseLeave={() => setIsHover(null)}
              >
                <span>{navItem.label}</span>
                {isHover === navItem.id && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute inset-0 size-full bg-black/5"
                    style={{
                      borderRadius: 99,
                    }}
                  />
                )}
              </a>
            ) : (
              <button
                className="relative flex cursor-pointer items-center justify-center gap-1 py-1.5 px-4 text-sm font-medium text-black dark:text-white transition-colors duration-300 hover:text-black dark:hover:text-white group"
                onMouseEnter={() => setIsHover(navItem.id)}
                onMouseLeave={() => setIsHover(null)}
              >
                <span>{navItem.label}</span>
                {navItem.subMenus && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 group-hover:rotate-180 ${
                      openMenu === navItem.label ? "rotate-180" : ""
                    }`}
                  />
                )}
                {(isHover === navItem.id || openMenu === navItem.label) && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute inset-0 size-full bg-black/5"
                    style={{
                      borderRadius: 99,
                    }}
                  />
                )}
              </button>
            )}

            <AnimatePresence>
              {openMenu === navItem.label && navItem.subMenus && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-auto pt-8 z-10">
                  <motion.div
                    className="w-max bg-white dark:bg-[#1e1e1e] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 dark:border-gray-800 overflow-hidden"
                    style={{
                      borderRadius: 24,
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex">
                      {navItem.subMenus.map((sub, subIndex) => (
                        <motion.div
                          layout
                          className={`p-6 ${
                            sub.variant === "simple"
                              ? "bg-[#f3f4f6] dark:bg-[#2a2a2a] rounded-2xl m-2 ml-0"
                              : ""
                          }`}
                          key={sub.title}
                        >
                          <h3 className="mb-5 text-sm font-semibold text-gray-600 dark:text-gray-400">
                            {sub.title}
                          </h3>

                          {sub.variant === "simple" ? (
                            <div className="space-y-4">
                              <ul className="space-y-2 min-w-[280px]">
                                {sub.items.map((item) => (
                                  <li key={item.label}>
                                    <a
                                      href={getLocalizedHref(item.href || "#")}
                                      className="group relative flex items-center text-sm font-medium text-gray-900 dark:text-gray-100 px-4 py-2.5 rounded-xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-lg"
                                    >
                                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-[#f3f4f6] dark:bg-[#2a2a2a] rounded-full opacity-0 group-hover:w-[300px] group-hover:h-[300px] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                                      <ArrowRight className="absolute w-4 h-4 left-[-20px] text-gray-900 dark:text-gray-100 z-10 group-hover:left-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
                                      <span className="relative z-10 transition-all duration-500 ease-out group-hover:translate-x-6">
                                        {item.label}
                                      </span>
                                      {item.notificationCount && (
                                        <span className="relative z-10 ml-2 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold text-white bg-red-500 rounded-full transition-all duration-500 ease-out group-hover:translate-x-6">
                                          {item.notificationCount}
                                        </span>
                                      )}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                              <div className="px-4 pt-2">
                                <LanguageSelectorDropdown />
                              </div>
                            </div>
                          ) : (
                            <ul className="space-y-3 min-w-[280px]">
                              {sub.items.map((item) => {
                                const Icon = item.icon;
                                const href = getLocalizedHref(item.href || "#");
                                const isHash = (item.href || "").includes("#");
                                return (
                                  <li key={item.label}>
                                    <a
                                      href={isHash ? undefined : href}
                                      onClick={isHash ? (e) => {
                                        e.preventDefault();
                                        setOpenMenu(null);
                                        const id = (item.href || "").split("#")[1];
                                        const el = id ? document.getElementById(id) : null;
                                        if (el) {
                                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        } else {
                                          router.push(href);
                                        }
                                      } : () => setOpenMenu(null)}
                                      className="group relative flex items-start gap-3 p-3 rounded-xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-lg cursor-pointer"
                                    >
                                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-[#f3f4f6] dark:bg-[#2a2a2a] rounded-full opacity-0 group-hover:w-[400px] group-hover:h-[400px] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                                      <ArrowRight className="absolute w-4 h-4 left-[-20px] top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-100 z-10 group-hover:left-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
                                      {Icon && (
                                        <div className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:bg-white dark:group-hover:bg-[#1e1e1e] group-hover:text-black dark:group-hover:text-white group-hover:translate-x-5">
                                          <Icon className="h-5 w-5" />
                                        </div>
                                      )}
                                      <div className="relative z-10 flex flex-col transition-all duration-500 ease-out group-hover:translate-x-5">
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                            {item.label}
                                          </span>
                                          {item.badge && (
                                            <span className="px-2 py-0.5 text-xs font-medium text-white bg-red-500 rounded-full">
                                              {item.badge}
                                            </span>
                                          )}
                                        </div>
                                        {item.description && (
                                          <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                            {item.description}
                                          </span>
                                        )}
                                      </div>
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          )}

                          {subIndex === 0 && navItem.ctaButton && (
                            <a
                              href={getLocalizedHref(navItem.ctaButton.href)}
                              className="mt-6 block [&>button]:w-full [&>button]:py-3.5 [&>button]:text-base"
                            >
                              <FlowButton text={navItem.ctaButton.label} variant="solid" />
                            </a>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    );
  }
);

MegaMenu.displayName = "MegaMenu";

export default MegaMenu;
