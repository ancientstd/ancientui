import type React from 'react';

import { SiteFooter } from '@/components/site-footer';
import { SiteNavbar } from '@/components/site-navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <SiteNavbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
