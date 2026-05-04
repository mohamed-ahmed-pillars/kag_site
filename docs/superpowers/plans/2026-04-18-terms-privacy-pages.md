# Terms & Privacy Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add bilingual Terms & Conditions and Privacy Policy pages with footer links, using static i18n JSON content following the existing neumorphic design system.

**Architecture:** Two server-component pages under `app/[locale]/` consume `useTranslations` for bilingual content. Content lives entirely in `en.json`/`ar.json`. The Footer bottom-bar gains two inline links.

**Tech Stack:** Next.js 16, next-intl, Tailwind v4, Framer Motion, TypeScript. Run with `bun`.

---

## File Map

| Action | File |
|--------|------|
| Modify | `frontend/messages/en.json` — add `terms`, `privacy`, `footer.terms`, `footer.privacy` keys |
| Modify | `frontend/messages/ar.json` — same keys in Arabic |
| Create | `frontend/app/[locale]/terms/page.tsx` |
| Create | `frontend/app/[locale]/privacy/page.tsx` |
| Modify | `frontend/components/layout/Footer.tsx` — add Terms/Privacy links to bottom bar |

---

## Task 1: Add English i18n content

**Files:**
- Modify: `frontend/messages/en.json`

- [ ] **Step 1: Add `terms` namespace to en.json**

Find the closing `}` of the last namespace before the final `}` in `en.json` and add after it:

```json
  "terms": {
    "hero": {
      "badge": "Legal",
      "title": "Terms & Conditions",
      "subtitle": "Please read these terms carefully before using our website and services."
    },
    "lastUpdated": "Last updated: April 2026",
    "sections": [
      {
        "title": "Acceptance of Terms",
        "body": "By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this site."
      },
      {
        "title": "Use License",
        "body": "Permission is granted to temporarily download one copy of the materials on KAG's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials, use the materials for any commercial purpose, attempt to decompile or reverse engineer any software contained on the website, remove any copyright or other proprietary notations from the materials, or transfer the materials to another person."
      },
      {
        "title": "Disclaimer",
        "body": "The materials on KAG's website are provided on an 'as is' basis. KAG makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
      },
      {
        "title": "Limitations",
        "body": "In no event shall KAG or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on KAG's website, even if KAG or a KAG authorized representative has been notified orally or in writing of the possibility of such damage."
      },
      {
        "title": "Contact Information",
        "body": "If you have any questions about these Terms & Conditions, please contact us at our facility: 10th of Ramadan City, Industrial Zone, Sharkia Governorate, Egypt, or via email at info@kagegypt.com."
      }
    ]
  },
  "privacy": {
    "hero": {
      "badge": "Legal",
      "title": "Privacy Policy",
      "subtitle": "Your privacy matters to us. Learn how we collect, use, and protect your personal information."
    },
    "lastUpdated": "Last updated: April 2026",
    "sections": [
      {
        "title": "Information We Collect",
        "body": "We collect information you provide directly to us, including your name, email address, phone number, company information, and any messages you send us when contacting us or requesting a quotation."
      },
      {
        "title": "How We Use Your Information",
        "body": "We use the information we collect to respond to your inquiries, process quotation requests, send newsletters and updates (with your permission), improve our website and services, and comply with legal obligations."
      },
      {
        "title": "Information Sharing",
        "body": "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except when required by law or to protect our rights and the safety of others."
      },
      {
        "title": "Data Security",
        "body": "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
      },
      {
        "title": "Cookies",
        "body": "Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some functionality of the site."
      },
      {
        "title": "Your Rights",
        "body": "You have the right to access, correct, or delete your personal data at any time. You may also unsubscribe from our communications at any time by contacting us directly or using the unsubscribe link in our emails."
      },
      {
        "title": "Contact Information",
        "body": "For any privacy-related requests or questions, please contact us at: 10th of Ramadan City, Industrial Zone, Sharkia Governorate, Egypt, or via email at info@kagegypt.com."
      },
      {
        "title": "Policy Updates",
        "body": "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically."
      }
    ]
  }
```

Also add to the existing `"footer"` key:
```json
"terms": "Terms & Conditions",
"privacy": "Privacy Policy"
```

- [ ] **Step 2: Verify JSON is valid**

```bash
cd frontend && bun run build 2>&1 | head -20
```

Expected: no JSON parse errors. If errors appear, check for missing commas between namespace blocks.

- [ ] **Step 3: Commit**

```bash
cd frontend
git add messages/en.json
git commit -m "i18n: add English content for terms and privacy pages"
```

---

## Task 2: Add Arabic i18n content

**Files:**
- Modify: `frontend/messages/ar.json`

- [ ] **Step 1: Add `terms` namespace to ar.json**

Add after the last namespace, same position as in en.json:

```json
  "terms": {
    "hero": {
      "badge": "قانوني",
      "title": "الشروط والأحكام",
      "subtitle": "يرجى قراءة هذه الشروط بعناية قبل استخدام موقعنا وخدماتنا."
    },
    "lastUpdated": "آخر تحديث: أبريل 2026",
    "sections": [
      {
        "title": "قبول الشروط",
        "body": "بالوصول إلى هذا الموقع واستخدامه، فإنك توافق على الالتزام بشروط وأحكام هذه الاتفاقية. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام هذا الموقع."
      },
      {
        "title": "ترخيص الاستخدام",
        "body": "يُمنح الإذن بتنزيل نسخة واحدة مؤقتة من المواد الموجودة على موقع KAG للاستخدام الشخصي غير التجاري المؤقت فقط. هذا منح ترخيص وليس نقل ملكية، ولا يجوز لك بموجب هذا الترخيص تعديل المواد أو نسخها أو استخدامها لأي غرض تجاري أو نقلها إلى شخص آخر."
      },
      {
        "title": "إخلاء المسؤولية",
        "body": "تُقدَّم المواد الموجودة على موقع KAG على أساس 'كما هي'. لا تقدم KAG أي ضمانات صريحة أو ضمنية، وتتنصل من جميع الضمانات الأخرى بما في ذلك ضمانات القابلية للتسويق أو الملاءمة لغرض معين."
      },
      {
        "title": "حدود المسؤولية",
        "body": "لن تكون KAG أو مورديها في أي حال من الأحوال مسؤولة عن أي أضرار ناجمة عن استخدام أو عدم القدرة على استخدام المواد الموجودة على موقع KAG، حتى لو تم إخطار KAG بإمكانية حدوث مثل هذه الأضرار."
      },
      {
        "title": "معلومات الاتصال",
        "body": "إذا كانت لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا في مقرنا: مدينة العاشر من رمضان، المنطقة الصناعية، محافظة الشرقية، مصر، أو عبر البريد الإلكتروني: info@kagegypt.com."
      }
    ]
  },
  "privacy": {
    "hero": {
      "badge": "قانوني",
      "title": "سياسة الخصوصية",
      "subtitle": "خصوصيتك تهمنا. تعرف على كيفية جمع معلوماتك الشخصية واستخدامها وحمايتها."
    },
    "lastUpdated": "آخر تحديث: أبريل 2026",
    "sections": [
      {
        "title": "المعلومات التي نجمعها",
        "body": "نجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك اسمك وعنوان بريدك الإلكتروني ورقم هاتفك ومعلومات شركتك وأي رسائل ترسلها إلينا عند التواصل معنا أو طلب عرض سعر."
      },
      {
        "title": "كيفية استخدام معلوماتك",
        "body": "نستخدم المعلومات التي نجمعها للرد على استفساراتك، ومعالجة طلبات عروض الأسعار، وإرسال النشرات الإخبارية والتحديثات (بإذنك)، وتحسين موقعنا وخدماتنا، والامتثال للالتزامات القانونية."
      },
      {
        "title": "مشاركة المعلومات",
        "body": "نحن لا نبيع أو نتاجر أو ننقل معلوماتك الشخصية إلى أطراف ثالثة دون موافقتك، إلا عندما يقتضي ذلك القانون أو لحماية حقوقنا وسلامة الآخرين."
      },
      {
        "title": "أمان البيانات",
        "body": "نطبق تدابير أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الإفصاح أو الإتلاف. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة 100٪."
      },
      {
        "title": "ملفات الارتباط (Cookies)",
        "body": "قد يستخدم موقعنا ملفات الارتباط لتحسين تجربة التصفح. يمكنك اختيار تعطيل ملفات الارتباط من خلال إعدادات المتصفح، وإن كان ذلك قد يؤثر على بعض وظائف الموقع."
      },
      {
        "title": "حقوقك",
        "body": "يحق لك الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت. يمكنك أيضاً إلغاء الاشتراك في مراسلاتنا في أي وقت عن طريق التواصل معنا مباشرة أو استخدام رابط إلغاء الاشتراك في رسائلنا الإلكترونية."
      },
      {
        "title": "معلومات الاتصال",
        "body": "لأي طلبات أو أسئلة تتعلق بالخصوصية، يرجى التواصل معنا على: مدينة العاشر من رمضان، المنطقة الصناعية، محافظة الشرقية، مصر، أو عبر البريد الإلكتروني: info@kagegypt.com."
      },
      {
        "title": "تحديثات السياسة",
        "body": "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة مع تاريخ المراجعة المحدث. نشجعك على مراجعة هذه السياسة بشكل دوري."
      }
    ]
  }
```

Also add to the existing `"footer"` key in ar.json:
```json
"terms": "الشروط والأحكام",
"privacy": "سياسة الخصوصية"
```

- [ ] **Step 2: Verify JSON is valid**

```bash
cd frontend && node -e "JSON.parse(require('fs').readFileSync('messages/ar.json','utf8')); console.log('OK')"
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add messages/ar.json
git commit -m "i18n: add Arabic content for terms and privacy pages"
```

---

## Task 3: Create Terms page

**Files:**
- Create: `frontend/app/[locale]/terms/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';
import { Container } from '@/components/ui';

export default function TermsPage() {
  const t = useTranslations('terms');
  const sections = t.raw('sections') as { title: string; body: string }[];

  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f]">
      <Container>
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div
              className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5] dark:bg-[#1e1e1e]"
              style={{ borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
                <Scale className="w-4 h-4 text-[#354c9a] dark:text-gray-400" />
                {t('hero.badge')}
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Sections */}
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
            {t('lastUpdated')}
          </p>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify it builds**

```bash
cd frontend && bun run build 2>&1 | grep -E "error|Error|✓|terms"
```

Expected: `✓ /[locale]/terms` with no errors.

- [ ] **Step 3: Commit**

```bash
git add app/\[locale\]/terms/
git commit -m "feat: add Terms & Conditions page"
```

---

## Task 4: Create Privacy page

**Files:**
- Create: `frontend/app/[locale]/privacy/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui';

export default function PrivacyPage() {
  const t = useTranslations('privacy');
  const sections = t.raw('sections') as { title: string; body: string }[];

  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f]">
      <Container>
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div
              className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5] dark:bg-[#1e1e1e]"
              style={{ borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
                <ShieldCheck className="w-4 h-4 text-[#354c9a] dark:text-gray-400" />
                {t('hero.badge')}
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Sections */}
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
            {t('lastUpdated')}
          </p>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify it builds**

```bash
cd frontend && bun run build 2>&1 | grep -E "error|Error|✓|privacy"
```

Expected: `✓ /[locale]/privacy` with no errors.

- [ ] **Step 3: Commit**

```bash
git add app/\[locale\]/privacy/
git commit -m "feat: add Privacy Policy page"
```

---

## Task 5: Add footer links

**Files:**
- Modify: `frontend/components/layout/Footer.tsx`

- [ ] **Step 1: Update the bottom row of Footer.tsx**

Find the bottom row div (around line 144) and replace it:

```tsx
{/* Bottom row */}
<div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-500">
  <p>© {currentYear} Technology Pillars. {t('footer.rights')}</p>
  <div className="flex items-center gap-4">
    <Link
      href={`/${locale}/terms`}
      className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
    >
      {t('footer.terms')}
    </Link>
    <Link
      href={`/${locale}/privacy`}
      className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
    >
      {t('footer.privacy')}
    </Link>
  </div>
  <p className="text-gray-300 dark:text-gray-600 text-[11px]">
    {locale === 'ar' ? 'صُنع بـ ❤️ في مصر' : 'Made with ❤️ in Egypt'}
  </p>
</div>
```

- [ ] **Step 2: Verify build**

```bash
cd frontend && bun run build 2>&1 | grep -E "error|Error|✓ Compiled"
```

Expected: clean build, no errors.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Terms and Privacy links to footer"
```

---

## Task 6: Manual smoke test

- [ ] **Step 1: Start dev server**

```bash
cd frontend && bun run dev
```

- [ ] **Step 2: Test all routes**

Visit in browser:
- `http://localhost:3000/en/terms` — should show 5 numbered cards in English
- `http://localhost:3000/ar/terms` — should show 5 numbered cards in Arabic, RTL layout
- `http://localhost:3000/en/privacy` — should show 8 numbered cards in English
- `http://localhost:3000/ar/privacy` — should show 8 numbered cards in Arabic, RTL layout
- `http://localhost:3000/en` — footer bottom bar should show "Terms & Conditions" and "Privacy Policy" links
- `http://localhost:3000/ar` — footer should show "الشروط والأحكام" and "سياسة الخصوصية"

- [ ] **Step 3: Test dark mode**

Toggle dark mode on each page — cards, text, and badge should switch correctly.

- [ ] **Step 4: Final commit if clean**

```bash
git log --oneline -5
```

All 4 feature commits should be present. No further commit needed.
