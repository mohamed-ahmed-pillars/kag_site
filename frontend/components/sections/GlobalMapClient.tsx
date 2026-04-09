'use client';

import dynamic from 'next/dynamic';

const GlobalMap = dynamic(() => import('@/components/sections/GlobalMap'), {
  ssr: false,
  loading: () => <div className="py-16 h-[480px]" />,
});

export default function GlobalMapClient() {
  return <GlobalMap />;
}
