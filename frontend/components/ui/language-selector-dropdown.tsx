"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ar", label: "عربي", flag: "🇸🇦" },
];

export const LanguageSelectorDropdown = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = (params?.locale as string) || "en";

  const [selected, setSelected] = useState(
    languages.find((lang) => lang.code === currentLocale) || languages[0]
  );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentLang = languages.find((lang) => lang.code === currentLocale);
    if (currentLang) {
      setSelected(currentLang);
    }
  }, [currentLocale]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: (typeof languages)[0]) => {
    setSelected(lang);
    setOpen(false);

    // Get the path without the locale prefix
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";

    // Navigate to the new locale path
    router.push(`/${lang.code}${pathWithoutLocale}`);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
           "bg-[#030712] dark:bg-white backdrop-blur-md shadow-sm",
           "border-gray-800 dark:border-gray-200",
           "text-white dark:text-[#111111]",
           "hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
        )}
      >
        <span>{selected.flag}</span>
        <span>{selected.label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute left-0 mt-2 w-48 rounded-xl overflow-hidden z-50",
             "bg-white/95 dark:bg-white/95 backdrop-blur-xl",
             "shadow-lg border border-gray-200 dark:border-gray-200",
             "animate-in fade-in-0 zoom-in-95 duration-200"
          )}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2.5 text-sm text-left transition-colors",
                selected.code === lang.code
                   ? "font-semibold text-gray-900 dark:text-gray-900 bg-gray-100 dark:bg-gray-100"
                   : "text-gray-700 dark:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-50"
              )}
            >
              <span>{lang.flag}</span>
              <span className="flex-1">{lang.label}</span>
              {selected.code === lang.code && (
                <Check className="h-4 w-4 text-gray-900 dark:text-gray-100" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
