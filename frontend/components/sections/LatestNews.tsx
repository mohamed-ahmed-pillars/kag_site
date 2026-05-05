'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Container } from '@/components/ui';
import { ExpandableCard } from '@/components/ui/expandable-card';
import { FlowButton } from '@/components/ui/flow-button';

const posts = [
  {
    id: 1,
    slug: 'expanding-export-markets',
    title_en: 'KAG Expands Export Markets to 5 New Countries',
    title_ar: 'كيه أي جي تتوسع في 5 أسواق تصدير جديدة',
    excerpt_en: 'Company News',
    excerpt_ar: 'أخبار الشركة',
    date: '2026-03-10',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
    body_en: [
      { heading: 'A New Chapter in Global Expansion', body: 'KAG is proud to announce its entry into five new international markets across Eastern Europe and Southeast Asia. This milestone marks a pivotal step in our mission to bring premium Egyptian food products to consumers around the world.' },
      { heading: 'Strategic Partnerships', body: 'Working alongside established regional distributors, KAG has secured long-term agreements ensuring consistent supply chains and quality control across all new territories.' },
      { heading: 'What This Means for Customers', body: 'Consumers in these new markets will now have direct access to our full range of certified products, from extra-virgin olive oil to our award-winning tomato paste.' },
    ],
    body_ar: [
      { heading: 'فصل جديد في التوسع العالمي', body: 'تعتز كيه أي جي بالإعلان عن دخولها خمسة أسواق دولية جديدة في أوروبا الشرقية وجنوب شرق آسيا، في خطوة محورية نحو إيصال المنتجات الغذائية المصرية الممتازة لمستهلكين حول العالم.' },
      { heading: 'شراكات استراتيجية', body: 'بالتعاون مع موزعين إقليميين راسخين، أبرمت الشركة اتفاقيات طويلة الأمد تضمن سلاسل إمداد متسقة ورقابة جودة في جميع الأسواق الجديدة.' },
      { heading: 'ماذا يعني هذا للعملاء', body: 'سيتمكن المستهلكون في هذه الأسواق من الحصول على تشكيلتنا الكاملة من المنتجات المعتمدة، من زيت الزيتون البكر الممتاز إلى معجون الطماطم الحائز على جوائز.' },
    ],
  },
  {
    id: 2,
    slug: 'new-organic-certification',
    title_en: 'KAG Receives New Organic Certification',
    title_ar: 'كيه أي جي تحصل على شهادة عضوية جديدة',
    excerpt_en: 'Certifications',
    excerpt_ar: 'الشهادات',
    date: '2026-03-05',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&h=600&fit=crop',
    body_en: [
      { heading: 'Commitment to Organic Standards', body: 'KAG has officially received its latest organic certification from an internationally accredited body, reflecting our unwavering commitment to natural, chemical-free food production.' },
      { heading: 'What Changes in Production', body: 'Our certified organic product line now covers 12 SKUs, with full traceability from farm to shelf. Every ingredient is sourced from certified organic farms across the Nile Delta.' },
      { heading: 'Healthier Choices for Every Consumer', body: 'This certification underlines our promise to health-conscious consumers: everything in our organic range is free from synthetic pesticides, GMOs, and artificial additives.' },
    ],
    body_ar: [
      { heading: 'الالتزام بمعايير العضوية', body: 'حصلت كيه أي جي رسمياً على أحدث شهادة عضوية من جهة معتمدة دولياً، مما يعكس التزامنا الراسخ بإنتاج غذاء طبيعي خالٍ من المواد الكيميائية.' },
      { heading: 'ما الذي يتغير في الإنتاج', body: 'تغطي تشكيلتنا من المنتجات العضوية المعتمدة الآن 12 منتجاً، مع إمكانية التتبع الكامل من المزرعة إلى الرف. كل مكوّن مصدره مزارع عضوية معتمدة في دلتا النيل.' },
      { heading: 'خيارات أكثر صحة لكل مستهلك', body: 'تؤكد هذه الشهادة وعدنا للمستهلكين المهتمين بالصحة: كل منتجاتنا العضوية خالية من المبيدات الاصطناعية والكائنات المعدلة وراثياً والمضافات الاصطناعية.' },
    ],
  },
  {
    id: 3,
    slug: 'food-expo-2026',
    title_en: 'Join Us at Food Expo 2026',
    title_ar: 'انضموا إلينا في معرض الغذاء 2026',
    excerpt_en: 'Events',
    excerpt_ar: 'الفعاليات',
    date: '2026-02-28',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
    body_en: [
      { heading: 'Where to Find Us', body: 'KAG will be exhibiting at Booth H-14 in Hall 3 of the Cairo International Convention Centre. Our team will be on hand to showcase our latest product innovations and discuss partnership opportunities.' },
      { heading: 'New Products on Display', body: 'Food Expo 2026 will mark the public debut of three new product lines — including our cold-pressed avocado oil, a premium range of stuffed olives, and our new export-grade pomegranate molasses.' },
      { heading: 'Schedule a Meeting', body: 'We welcome meetings with distributors, importers, and retail buyers. Reach out through our contact page to reserve a slot with our export team during the expo.' },
    ],
    body_ar: [
      { heading: 'أين تجدنا', body: 'ستشارك كيه أي جي في الجناح H-14 في القاعة 3 بمركز القاهرة الدولي للمؤتمرات. سيكون فريقنا متاحاً لعرض أحدث ابتكاراتنا ومناقشة فرص الشراكة.' },
      { heading: 'منتجات جديدة للعرض', body: 'سيشهد معرض الغذاء 2026 الإطلاق الرسمي لثلاثة خطوط منتجات جديدة، منها زيت الأفوكادو المعصور على البارد وتشكيلة زيتون محشو فاخرة ودبس رمان بمواصفات التصدير.' },
      { heading: 'احجز اجتماعاً', body: 'نرحب بالاجتماعات مع الموزعين والمستوردين وتجار التجزئة. تواصل عبر صفحة الاتصال لحجز موعد مع فريق التصدير خلال المعرض.' },
    ],
  },
];

export default function LatestNews() {
  const t = useTranslations('home.news');
  const locale = useLocale();

  return (
    <section className="py-20 mt-16">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div
              className="inline-block rounded-3xl px-4 py-1.5"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderTop: 'var(--card-border-top)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
                <Newspaper className="w-4 h-4" />
                {t('title')}
              </span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const bodyItems = locale === 'ar' ? post.body_ar : post.body_en;
            return (
              <ExpandableCard
                key={post.id}
                title={locale === 'ar' ? post.title_ar : post.title_en}
                src={post.image}
                description={locale === 'ar' ? post.excerpt_ar : post.excerpt_en}
                classNameExpanded="[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-semibold [&_h4]:text-lg"
              >
                {bodyItems.map((item, i) => (
                  <React.Fragment key={i}>
                    <h4>{item.heading}</h4>
                    <p>{item.body}</p>
                  </React.Fragment>
                ))}
              </ExpandableCard>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link href={`/${locale}/blog`}>
            <FlowButton text={t('viewAll')} variant="solid" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
