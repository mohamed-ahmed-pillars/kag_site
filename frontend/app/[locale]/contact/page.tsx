'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare,
  Facebook, Instagram, Linkedin, Twitter,
} from 'lucide-react';
import { Container } from '@/components/ui';

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
  { icon: Mail, key: 'email' },
  { icon: Clock, key: 'hours' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const neuDisc = {
  background: '#ebebeb',
  boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)',
};

const neuCard = {
  borderTop: '1px solid rgba(255,255,255,0.8)',
  boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
};

export default function ContactPage() {
  const t = useTranslations('contact');
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
    <section className="py-20 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]" style={neuCard}>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <MessageSquare className="w-4 h-4" />
                {t('hero.badge')}
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('hero.title')}</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('hero.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('info.title')}</h2>
            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={neuDisc}>
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{t(`info.${item.key}.title`)}</h3>
                      <p className="text-gray-500 text-sm">{t(`info.${item.key}.value`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">{t('info.social')}</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a key={social.label} href={social.href} className="w-10 h-10 rounded-full flex items-center justify-center transition hover:scale-105" style={neuDisc} aria-label={social.label}>
                      <Icon className="w-4 h-4 text-gray-600" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
            <div className="rounded-3xl p-8 bg-[#f5f5f5]" style={neuCard}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t('form.title')}</h2>

              {isSuccess && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-2xl flex items-center gap-2 text-gray-700 text-sm" style={{ background: '#e8e8e8', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)' }}>
                  <CheckCircle className="w-5 h-5" />
                  {t('form.success')}
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.name')} *</label>
                    <input {...register('name')} className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 ${errors.name ? 'ring-1 ring-red-400' : ''}`} style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)' }} placeholder={t('form.namePlaceholder')} />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.email')} *</label>
                    <input {...register('email')} type="email" className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 ${errors.email ? 'ring-1 ring-red-400' : ''}`} style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)' }} placeholder={t('form.emailPlaceholder')} />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.phone')}</label>
                    <input {...register('phone')} type="tel" className="w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none" style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)' }} placeholder={t('form.phonePlaceholder')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.subject')} *</label>
                    <input {...register('subject')} className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none ${errors.subject ? 'ring-1 ring-red-400' : ''}`} style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)' }} placeholder={t('form.subjectPlaceholder')} />
                    {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.message')} *</label>
                  <textarea {...register('message')} rows={5} className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none resize-none ${errors.message ? 'ring-1 ring-red-400' : ''}`} style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)' }} placeholder={t('form.messagePlaceholder')} />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-gray-900 transition-all hover:scale-105 disabled:opacity-60"
                  style={{ background: '#f5f5f5', borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)' }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-600 rounded-full animate-spin" />
                      {t('form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
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
