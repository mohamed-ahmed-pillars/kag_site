'use client';

import { motion } from 'framer-motion';

type Section = { title: string; body: string };

interface LegalSectionsProps {
  sections: Section[];
  lastUpdated: string;
}

export default function LegalSections({ sections, lastUpdated }: LegalSectionsProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {sections.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="rounded-3xl p-8 bg-[#f5f5f5] dark:bg-[#1e1e1e]"
          style={{ borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
        >
          <h2 className="text-lg font-bold mb-3 text-[#354c9a] dark:text-gray-100">
            {i + 1}. {section.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
            {section.body}
          </p>
        </motion.div>
      ))}
      <p className="text-center text-xs text-gray-400 dark:text-gray-600 pt-4">
        {lastUpdated}
      </p>
    </div>
  );
}
