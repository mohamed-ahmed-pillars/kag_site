'use client';

import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: 'outline' | 'solid';
}

export function FlowButton({
  text = "Modern Button",
  variant = 'outline',
  className,
  ...props
}: FlowButtonProps) {

  if (variant === 'solid') {
    // Solid dark button - no color change on hover
    return (
      <button
        className={cn(
          "group relative flex items-center justify-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-transparent bg-[#111111] dark:bg-white dark:border-gray-200 px-8 py-3 text-sm font-semibold text-white dark:text-[#111111] cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-[12px] active:scale-[0.95]",
          className
        )}
        {...props}
      >
        {/* Left arrow (slides in on hover) */}
        <ArrowRight
          className="absolute w-4 h-4 left-[-25%] stroke-white dark:stroke-[#111111] fill-none z-[9] group-hover:left-4 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        />

        {/* Text */}
        <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
          {text}
        </span>

        {/* Right arrow (slides out on hover) */}
        <ArrowRight
          className="absolute w-4 h-4 right-4 stroke-white dark:stroke-[#111111] fill-none z-[9] group-hover:right-[-25%] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        />
      </button>
    );
  }

  // Outline variant - transparent with border, no color change on hover
  return (
    <button
      className={cn(
        "group relative flex items-center justify-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-[#333333]/40 dark:border-gray-600 bg-transparent px-8 py-3 text-sm font-semibold text-[#111111] dark:text-gray-100 cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-[12px] active:scale-[0.95]",
        className
      )}
      {...props}
    >
      {/* Left arrow (slides in on hover) */}
      <ArrowRight
        className="absolute w-4 h-4 left-[-25%] stroke-[#111111] dark:stroke-gray-100 fill-none z-[9] group-hover:left-4 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      {/* Right arrow (slides out on hover) */}
      <ArrowRight
        className="absolute w-4 h-4 right-4 stroke-[#111111] dark:stroke-gray-100 fill-none z-[9] group-hover:right-[-25%] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      />
    </button>
  );
}
