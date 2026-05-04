'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { FlowButton } from '@/components/ui/flow-button';

export default function Newsletter() {
  const t = useTranslations('home.newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-16 px-4 max-w-2xl mx-auto">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex items-center gap-1.5 rounded-3xl px-4 py-1.5 bg-[#f5f5f5] dark:bg-[#1e1e1e]"
              style={{
                borderTop: 'var(--card-border-top)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <Mail className="w-4 h-4 text-gray-900 dark:text-gray-100" />
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t('badge')}</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto">
            {t('subtitle')}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col items-center gap-4">
            <div
              className="w-full rounded-2xl p-1.5"
              style={{
                background: 'var(--neuo-badge-bg)',
                boxShadow: 'var(--neuo-badge-shadow)',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-transparent px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none disabled:opacity-60"
              />
            </div>
            <FlowButton
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              variant="solid"
              text={
                status === 'loading' ? '...' :
                status === 'success' ? '✓ ' + t('success') :
                t('submit')
              }
            />
          </form>

          {/* Success message */}
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              {t('success')}
            </motion.p>
          )}

          <p className="mt-5 text-xs text-gray-400 dark:text-gray-500">{t('privacy')}</p>
        </motion.div>
      </div>
    </section>
  );
}
