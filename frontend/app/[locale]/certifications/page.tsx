'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Shield, CheckCircle, X, Calendar, Building2 } from 'lucide-react';
import { FeatureCard } from '@/components/ui/feature-card';

const certifications = [
  {
    id: 1,
    name_en: 'ISO 22000:2018',
    name_ar: 'آيزو 22000:2018',
    issuing_body_en: 'International Organization for Standardization',
    issuing_body_ar: 'المنظمة الدولية للمعايير',
    description_en: 'Food safety management systems - Requirements for any organization in the food chain.',
    description_ar: 'أنظمة إدارة سلامة الغذاء - متطلبات أي منظمة في سلسلة الغذاء.',
    valid_until: '2027-12-31',
  },
  {
    id: 2,
    name_en: 'HACCP',
    name_ar: 'تحليل المخاطر ونقاط التحكم الحرجة',
    issuing_body_en: 'Hazard Analysis Critical Control Points',
    issuing_body_ar: 'تحليل المخاطر ونقاط التحكم الحرجة',
    description_en: 'Systematic preventive approach to food safety from biological, chemical, and physical hazards.',
    description_ar: 'نهج وقائي منهجي لسلامة الغذاء من المخاطر البيولوجية والكيميائية والفيزيائية.',
    valid_until: '2026-06-30',
  },
  {
    id: 3,
    name_en: 'Halal Certification',
    name_ar: 'شهادة حلال',
    issuing_body_en: 'Islamic Food and Nutrition Council',
    issuing_body_ar: 'مجلس الغذاء والتغذية الإسلامي',
    description_en: 'Certification that products are prepared according to Islamic dietary laws.',
    description_ar: 'شهادة بأن المنتجات معدة وفقاً لقوانين الغذاء الإسلامية.',
    valid_until: '2026-12-31',
  },
  {
    id: 4,
    name_en: 'FDA Registered',
    name_ar: 'مسجل لدى FDA',
    issuing_body_en: 'U.S. Food and Drug Administration',
    issuing_body_ar: 'إدارة الغذاء والدواء الأمريكية',
    description_en: 'Registered facility with the U.S. FDA for food export to the United States.',
    description_ar: 'منشأة مسجلة لدى FDA الأمريكية لتصدير الغذاء إلى الولايات المتحدة.',
    valid_until: '2026-10-31',
  },
  {
    id: 5,
    name_en: 'Organic Certification',
    name_ar: 'شهادة عضوية',
    issuing_body_en: 'USDA Organic / EU Organic',
    issuing_body_ar: 'العضوية الأمريكية / العضوية الأوروبية',
    description_en: 'Certification for organic products meeting USDA and EU organic standards.',
    description_ar: 'شهادة للمنتجات العضوية التي تلبي معايير العضوية الأمريكية والأوروبية.',
    valid_until: '2026-08-31',
  },
  {
    id: 6,
    name_en: 'BRC Global Standard',
    name_ar: 'معيار BRC العالمي',
    issuing_body_en: 'British Retail Consortium',
    issuing_body_ar: 'اتحاد التجزئة البريطاني',
    description_en: 'Global standard for food safety, recognized by the Global Food Safety Initiative.',
    description_ar: 'معيار عالمي لسلامة الغذاء، معترف به من مبادرة سلامة الغذاء العالمية.',
    valid_until: '2027-03-31',
  },
];

/* ── Shared badge pill ── */
function CertBadge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.18em] uppercase text-gray-600 whitespace-nowrap"
      style={{ background: '#f0f0f0', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}
    >
      {children}
    </div>
  );
}

/* ── Illustrations ── */
function IsoIllustration() {
  const segments = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div className="absolute w-32 h-32 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
        {segments.map((i) => (
          <div key={i} className="absolute w-full h-full" style={{ transform: `rotate(${i * 30}deg)` }}>
            <div className="absolute left-1/2" style={{ top: 4, width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 10 : 6, marginLeft: i % 3 === 0 ? -1.5 : -1, borderRadius: 2, background: i % 3 === 0 ? '#888' : '#c0c0c0' }} />
          </div>
        ))}
      </motion.div>
      <div className="absolute w-24 h-24 rounded-full" style={{ background: 'linear-gradient(145deg, #eeeeee, #d8d8d8)', boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.1), inset -3px -3px 7px rgba(255,255,255,0.9)' }} />
      <motion.div className="relative z-10 flex items-center justify-center" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 18 }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <motion.path d="M5 13l4 4L19 7" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }} />
        </svg>
      </motion.div>
      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <CertBadge>ISO 22000</CertBadge>
      </motion.div>
    </div>
  );
}

function HaccpIllustration() {
  const nodes = [{ x: 50, y: 22, label: 'H' }, { x: 20, y: 52, label: 'A' }, { x: 80, y: 52, label: 'C' }, { x: 50, y: 80, label: 'CP' }];
  const lines: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3]];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="absolute" width="200" height="180" viewBox="0 0 100 110">
        {lines.map(([a, b], i) => (
          <motion.line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#ccc" strokeWidth="1.5" strokeDasharray="4 3" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.2 + i * 0.12, duration: 0.4 }} />
        ))}
        {nodes.map((n, i) => (
          <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 280, damping: 18 }} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
            <circle cx={n.x} cy={n.y} r="11" fill="#e8e8e8" style={{ filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.12)) drop-shadow(-1px -1px 2px rgba(255,255,255,0.9))' }} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="7" fontWeight="700" fill="#555">{n.label}</text>
          </motion.g>
        ))}
      </svg>
      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <CertBadge>HACCP</CertBadge>
      </motion.div>
    </div>
  );
}

function HalalIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div className="absolute w-28 h-28 rounded-full" style={{ border: '1.5px solid rgba(0,0,0,0.07)' }} animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }} />
      <div className="absolute w-24 h-24 rounded-full" style={{ background: 'linear-gradient(145deg, #efefef, #dcdcdc)', boxShadow: '6px 6px 14px rgba(0,0,0,0.1), -4px -4px 10px rgba(255,255,255,0.92)' }} />
      <motion.svg className="relative z-10" width="52" height="52" viewBox="0 0 52 52" initial={{ scale: 0, rotate: -30, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 16 }}>
        <circle cx="24" cy="26" r="16" fill="#444" />
        <circle cx="30" cy="20" r="13" fill="#e8e8e8" />
        <polygon points="40,10 41.5,14.5 46,14.5 42.5,17.5 43.8,22 40,19.2 36.2,22 37.5,17.5 34,14.5 38.5,14.5" fill="#444" />
      </motion.svg>
      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <CertBadge>Halal</CertBadge>
      </motion.div>
    </div>
  );
}

function FdaIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-28 h-28 rounded-full" style={{ background: 'linear-gradient(145deg, #f0f0f0, #d8d8d8)', boxShadow: '7px 7px 14px rgba(0,0,0,0.1), -5px -5px 12px rgba(255,255,255,0.92)' }} />
      <motion.div className="relative z-10 flex overflow-hidden" style={{ width: 56, height: 26, borderRadius: 13, boxShadow: '3px 3px 6px rgba(0,0,0,0.12), -2px -2px 5px rgba(255,255,255,0.9)' }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 18 }}>
        <div className="flex-1 bg-[#d0d0d0] flex items-center justify-center"><span style={{ fontSize: 8, fontWeight: 800, color: '#555', letterSpacing: 1 }}>FDA</span></div>
        <div className="flex-1 bg-[#444] flex items-center justify-center"><span style={{ fontSize: 8, fontWeight: 800, color: '#fff', letterSpacing: 1 }}>✓</span></div>
      </motion.div>
      <motion.div className="absolute z-20 h-0.5 rounded-full" style={{ width: 56, background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.25), transparent)' }} animate={{ y: [-13, 13, -13] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <CertBadge>FDA</CertBadge>
      </motion.div>
    </div>
  );
}

function OrganicIllustration() {
  const particles = [{ cx: 38, cy: 30 }, { cx: 62, cy: 24 }, { cx: 70, cy: 46 }];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-28 h-28 rounded-full" style={{ background: 'linear-gradient(145deg, #f0f0f0, #d8d8d8)', boxShadow: '7px 7px 14px rgba(0,0,0,0.1), -5px -5px 12px rgba(255,255,255,0.92)' }} />
      <motion.svg className="relative z-10" width="56" height="56" viewBox="0 0 56 56" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <motion.path d="M28 48 Q28 36 28 30" stroke="#555" strokeWidth="2" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.4 }} />
        <motion.path d="M28 30 Q14 16 20 8 Q36 4 40 18 Q44 30 28 30Z" fill="#555" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, type: 'spring', stiffness: 240, damping: 16 }} style={{ transformOrigin: '28px 30px' }} />
        <motion.path d="M28 30 Q30 20 32 12" stroke="#e8e8e8" strokeWidth="1" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.4 }} />
        {particles.map((p, i) => (
          <motion.circle key={i} cx={p.cx} cy={p.cy} r="2.5" fill="#aaa" initial={{ opacity: 0, y: 4 }} animate={{ opacity: [0, 0.7, 0], y: [4, -6, -14] }} transition={{ delay: 0.6 + i * 0.2, duration: 1.8, repeat: Infinity, ease: 'easeOut' }} />
        ))}
      </motion.svg>
      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <CertBadge>Organic</CertBadge>
      </motion.div>
    </div>
  );
}

function BrcIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-28 h-28 rounded-full" style={{ background: 'linear-gradient(145deg, #f0f0f0, #d8d8d8)', boxShadow: '7px 7px 14px rgba(0,0,0,0.1), -5px -5px 12px rgba(255,255,255,0.92)' }} />
      <motion.svg className="relative z-10" width="56" height="56" viewBox="0 0 56 56" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <motion.circle cx="28" cy="28" r="18" stroke="#888" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.6 }} />
        <motion.ellipse cx="28" cy="28" rx="9" ry="18" stroke="#aaa" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.5 }} />
        <motion.line x1="10" y1="28" x2="46" y2="28" stroke="#aaa" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.4 }} />
        <motion.line x1="13" y1="20" x2="43" y2="20" stroke="#bbb" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.3 }} />
        <motion.line x1="13" y1="36" x2="43" y2="36" stroke="#bbb" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.75, duration: 0.3 }} />
      </motion.svg>
      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <CertBadge>BRC</CertBadge>
      </motion.div>
    </div>
  );
}

const illustrations = [
  <IsoIllustration key="iso" />,
  <HaccpIllustration key="haccp" />,
  <HalalIllustration key="halal" />,
  <FdaIllustration key="fda" />,
  <OrganicIllustration key="organic" />,
  <BrcIllustration key="brc" />,
];

export default function CertificationsPage() {
  const t = useTranslations('certifications');
  const locale = useLocale();
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <>
      {/* Header */}
      <section className="py-20 bg-white min-h-screen px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div
              className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
              }}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2Z" fill="currentColor" className="text-gray-900" />
                </svg>
                {t('hero.badge')}
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('hero.title')}</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('hero.subtitle')}</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="cursor-pointer" onClick={() => setSelectedCert(cert)}>
              <FeatureCard
                title={locale === 'ar' ? cert.name_ar : cert.name_en}
                description={locale === 'ar' ? cert.issuing_body_ar : cert.issuing_body_en}
                illustration={illustrations[index]}
                delay={0.05 + index * 0.08}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-3xl p-8 max-w-lg w-full"
              style={{
                background: '#f5f5f5',
                borderTop: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}
                >
                  <Shield className="w-8 h-8 text-gray-700" />
                </div>
                <button onClick={() => setSelectedCert(null)} className="p-2 hover:bg-white/60 rounded-lg transition">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {locale === 'ar' ? selectedCert.name_ar : selectedCert.name_en}
              </h2>
              <p className="text-gray-600 font-medium mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {locale === 'ar' ? selectedCert.issuing_body_ar : selectedCert.issuing_body_en}
              </p>
              <p className="text-gray-500 mb-6">
                {locale === 'ar' ? selectedCert.description_ar : selectedCert.description_en}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{t('validUntil')}: {formatDate(selectedCert.valid_until)}</span>
                </div>
                <div className="flex items-center text-gray-700 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 me-1" />
                  {t('verified')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
