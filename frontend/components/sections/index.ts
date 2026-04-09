// Above-fold sections — statically imported
export { default as Hero } from './Hero';
export { default as StatsCounter } from './StatsCounter';
export { default as ProductShowcase } from './ProductShowcase';
export { default as Certifications } from './Certifications';

// Below-fold sections are NOT exported here.
// Import them via next/dynamic() to keep them out of the initial bundle:
//   dynamic(() => import('@/components/sections/PrivateLabel'))
//   dynamic(() => import('@/components/sections/GlobalMapClient'))   ← ssr:false wrapper
//   dynamic(() => import('@/components/sections/LatestNews'))
//   dynamic(() => import('@/components/sections/Newsletter'))
