'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Container } from '@/components/ui';

const items = [
  {
    icon: Phone,
    en: { title: 'Customer Service', value: '+20 108 083 8555', href: 'tel:+201080838555' },
    ar: { title: 'خدمة العملاء', value: '+20 108 083 8555', href: 'tel:+201080838555' },
  },
  {
    icon: Phone,
    en: { title: 'Suggestions', value: '+20 108 084 3334', href: 'tel:+201080843334' },
    ar: { title: 'الاقتراحات', value: '+20 108 084 3334', href: 'tel:+201080843334' },
  },
  {
    icon: Mail,
    en: { title: 'Email', value: 'wecare@kagegypt.com', href: 'mailto:wecare@kagegypt.com' },
    ar: { title: 'البريد الإلكتروني', value: 'wecare@kagegypt.com', href: 'mailto:wecare@kagegypt.com' },
  },
  {
    icon: MapPin,
    en: { title: 'Address', value: 'Office 2B – 1st Floor, Building 4, Mivida Business Park 3, 5th Settlement, New Cairo, Egypt', href: null },
    ar: { title: 'العنوان', value: 'مكتب 2B – الطابق الأول، مبنى 4، ميفيدا بيزنس بارك 3، التجمع الخامس، القاهرة الجديدة، مصر', href: null },
  },
];

export default function ContactInfo() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section className="py-16 bg-white dark:bg-[#0f0f0f]">
      <Container>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          {isAr ? 'تواصل معنا' : 'Get in Touch'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            const data = isAr ? item.ar : item.en;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#f5f5f5] dark:bg-[#1e1e1e]"
                style={{ boxShadow: 'var(--card-shadow)', borderTop: 'var(--card-border-top)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white dark:bg-[#2a2a2a]" style={{ boxShadow: 'var(--neuo-badge-shadow)' }}>
                  <Icon className="w-4 h-4 text-[#354c9a] dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#354c9a] dark:text-gray-400 mb-1">{data.title}</p>
                  {data.href ? (
                    <a href={data.href} className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {data.value}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-300">{data.value}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
