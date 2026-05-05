'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare,
  Facebook, Instagram, Linkedin,
} from 'lucide-react';
import { Container } from '@/components/ui';

function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return false;
  return resolvedTheme === 'dark';
}

// ── Contact page colors — edit here to test ───────────────────────
const contactColors = (isDark: boolean) => ({
  heading:       isDark ? '#f3f4f6' : '#111827',   // h1 / h2 headings
  badgeIcon:     isDark ? '#9ca3af' : '#354c9a',   // MessageSquare badge icon
  infoIcon:      isDark ? '#9ca3af' : '#354c9a',   // MapPin/Phone/Mail/Clock icons
  infoTitle:     isDark ? '#f3f4f6' : '#354c9a',   // contact info item titles
  socialIcon:    isDark ? '#9ca3af' : '#354c9a',   // social media icons
  socialHeading: isDark ? '#f3f4f6' : '#354c9a',   // "Follow us" label
  formHeading:   isDark ? '#f3f4f6' : '#354c9a',   // form section h2
  formLabel:     isDark ? '#d1d5db' : '#354c9a',   // form field labels
  successIcon:   isDark ? '#9ca3af' : '#354c9a',   // success CheckCircle
  submitIcon:    isDark ? '#9ca3af' : '#354c9a',   // Send icon in submit button
});
// ─────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: MapPin, key: 'address' },
  { icon: Phone, key: 'phone' },
  { icon: Phone, key: 'phone2' },
  { icon: Mail, key: 'email' },
  { icon: Clock, key: 'hours' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/share/1DNJqy7Bou/?mibextid=wwXIfr', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/kag.egypt', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/kagegypt/', label: 'LinkedIn' },
];

const neuDisc = {
  background: 'var(--neuo-surface)',
  boxShadow: 'var(--neuo-badge-shadow)',
};

const neuCard = {
  borderTop: 'var(--card-border-top)',
  boxShadow: 'var(--card-shadow)',
};

const neuInput = {
  boxShadow: 'var(--neuo-badge-shadow)',
};

export default function ContactPage() {
  const t = useTranslations('contact');
  const C = contactColors(useIsDark());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f]">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5] dark:bg-[#1e1e1e]" style={neuCard}>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
                <MessageSquare className="w-4 h-4" style={{ color: C.badgeIcon }} />
                {t('hero.badge')}
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: C.heading }}>{t('hero.title')}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t('hero.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-6" style={{ color: C.heading }}>{t('info.title')}</h2>
            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={neuDisc}>
                      <Icon className="w-5 h-5" style={{ color: C.infoIcon }} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: C.infoTitle }}>{t(`info.${item.key}.title`)}</h3>
                       <p className="text-gray-500 dark:text-gray-400 text-sm">{t(`info.${item.key}.value`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold mb-4" style={{ color: C.socialHeading }}>{t('info.social')}</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition hover:scale-105" style={neuDisc} aria-label={social.label}>
                      <Icon className="w-4 h-4" style={{ color: C.socialIcon }} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
            <div className="rounded-3xl p-8 bg-[#f5f5f5] dark:bg-[#1e1e1e]" style={neuCard}>
              <h2 className="text-xl font-bold mb-6" style={{ color: C.formHeading }}>{t('form.title')}</h2>

              {isSuccess && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-2xl flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm" style={{ background: 'var(--neuo-surface)', boxShadow: 'var(--neuo-badge-shadow)' }}>
                  <CheckCircle className="w-5 h-5" style={{ color: C.successIcon }} />
                  {t('form.success')}
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: C.formLabel }}>{t('form.name')} *</label>
                     <input {...register('name')} className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 ${errors.name ? 'ring-1 ring-red-400' : ''}`} style={neuInput} placeholder={t('form.namePlaceholder')} />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: C.formLabel }}>{t('form.email')} *</label>
                     <input {...register('email')} type="email" className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 ${errors.email ? 'ring-1 ring-red-400' : ''}`} style={neuInput} placeholder={t('form.emailPlaceholder')} />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: C.formLabel }}>{t('form.phone')}</label>
                     <input {...register('phone')} type="tel" className="w-full px-4 py-3 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none" style={neuInput} placeholder={t('form.phonePlaceholder')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: C.formLabel }}>{t('form.subject')} *</label>
                     <input {...register('subject')} className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none ${errors.subject ? 'ring-1 ring-red-400' : ''}`} style={neuInput} placeholder={t('form.subjectPlaceholder')} />
                    {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: C.formLabel }}>{t('form.message')} *</label>
                  <textarea {...register('message')} rows={5} className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none resize-none ${errors.message ? 'ring-1 ring-red-400' : ''}`} style={neuInput} placeholder={t('form.messagePlaceholder')} />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-gray-900 dark:text-gray-100 transition-all hover:scale-105 disabled:opacity-60"
                   style={{ background: 'var(--card-bg)', borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-gray-400/30 dark:border-gray-600/30 border-t-gray-600 dark:border-t-gray-400 rounded-full animate-spin" />
                      {t('form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" style={{ color: C.submitIcon }} />
                      {t('form.submit')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
