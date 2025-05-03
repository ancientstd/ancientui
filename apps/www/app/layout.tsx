import type React from 'react';
import { Toast } from 'ancientstd';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Providers } from '@/components/providers';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}`,
    template: `%s / ${siteConfig.name}`,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: siteConfig.ogImage,
  },
  description: siteConfig.description,
  alternates: {
    canonical: './',
  },
  keywords: [
    'React',
    'Next.js',
    'Tailwind CSS',
    'UI Components',
    'UI Kit',
    'UI Library',
    'UI Framework',
    'React Aria',
    'React Aria Components',
    'React Components',
    'Next UI Components',
    'UI Design System',
    'Ancient UI',
    'Ancient Components',
  ],
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const js = String.raw;
  return (
    <html
      dir="ltr"
      lang="en"
      className={cn('scroll-smooth', geistSans.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: js`
              try {
                _updateTheme(localStorage.currentTheme)
              } catch (_) {}

              try {
                if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
                  document.documentElement.classList.add('os-macos')
                }
              } catch (_) {}

              function _updateTheme(theme) {
                let classList = document.documentElement.classList;

                classList.remove("light", "dark", "system");
                document.querySelectorAll('meta[name="theme-color"]').forEach(el => el.remove())
                if (theme === 'dark') {
                  classList.add('dark')

                  let meta = document.createElement('meta')
                  meta.name = 'theme-color'
                  meta.content = 'oklch(.13 .028 261.692)'
                  document.head.appendChild(meta)
                } else if (theme === 'light') {
                  classList.add('light')

                  let meta = document.createElement('meta')
                  meta.name = 'theme-color'
                  meta.content = 'white'
                  document.head.appendChild(meta)
                } else {
                  classList.add('system')

                  let meta1 = document.createElement('meta')
                  meta1.name = 'theme-color'
                  meta1.content = 'oklch(.13 .028 261.692)'
                  meta1.media = '(prefers-color-scheme: dark)'
                  document.head.appendChild(meta1)

                  let meta2 = document.createElement('meta')
                  meta2.name = 'theme-color'
                  meta2.content = 'white'
                  meta2.media = '(prefers-color-scheme: light)'
                  document.head.appendChild(meta2)
                }
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <Providers>
          <Toast />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
