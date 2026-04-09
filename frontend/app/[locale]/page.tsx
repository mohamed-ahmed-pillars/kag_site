import {
  Hero,
  ProductShowcase,
  Certifications,
} from '@/components/sections';
import { MagicText } from '@/components/ui/magic-text';
import { FeatureCard } from '@/components/ui/feature-card';
import {
  QualityIllustration,
  ExportIllustration,
  PartnerIllustration,
} from '@/components/ui/benefit-illustrations';
import { Star } from 'lucide-react';
import dynamic from 'next/dynamic';

const PrivateLabel = dynamic(() => import('@/components/sections/PrivateLabel'));
const GlobalMap    = dynamic(() => import('@/components/sections/GlobalMap'),   { ssr: false });
const LatestNews   = dynamic(() => import('@/components/sections/LatestNews'));
const Newsletter   = dynamic(() => import('@/components/sections/Newsletter'));

const featureCards = [
  {
    title: 'Premium Quality',
    description: 'Every product meets the highest international food safety and quality standards.',
    illustration: <QualityIllustration />,
  },
  {
    title: 'Global Export',
    description: 'Delivering to 30+ countries with a reliable and efficient distribution network.',
    illustration: <ExportIllustration />,
  },
  {
    title: 'Trusted Partner',
    description: '500+ satisfied clients worldwide built on trust, consistency, and excellence.',
    illustration: <PartnerIllustration />,
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <div style={{ backgroundColor: '#f8f8f8', borderTop: '4px solid #fbfbfb', borderBottom: '4px solid #fbfbfb' }} className="w-full">
        <section className="flex items-center justify-center py-24 px-4 max-w-4xl mx-auto">
          <MagicText text="*KAG* *has* *been* *a* trusted *leader* *in* food *manufacturing* *and* export *for* *over* 25 *years,* *delivering* premium *products* *to* *more* *than* 30 *countries* *with* 500 *satisfied* clients *worldwide.*" />
        </section>
      </div>
      <section className="py-16 px-4 max-w-6xl mx-auto">
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
                <Star className="w-4 h-4" />
                BENEFITS
              </span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            From farm to shelf, we uphold the highest standards in quality, safety, and reliability — trusted by clients across the globe.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((card, index) => (
            <FeatureCard
              key={card.title}
              title={card.title}
              description={card.description}
              illustration={card.illustration}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </section>
      <Certifications />
      <ProductShowcase />
      <PrivateLabel />
      <GlobalMap />
      <LatestNews />
      <Newsletter />
    </>
  );
}
