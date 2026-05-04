'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export default function WhatsAppButton({
  phoneNumber = '+201234567890',
}: WhatsAppButtonProps) {
  const locale = useLocale();
  const message = locale === 'ar'
    ? 'مرحباً، أود الاستفسار عن منتجاتكم'
    : 'Hello, I would like to inquire about your products';

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 ${locale === 'ar' ? 'left-6' : 'right-6'} z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
}
