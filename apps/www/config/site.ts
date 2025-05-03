export interface NavItem {
  title: string;
  href?: string;
  external?: boolean;
  children?: NavItem[];
}

export interface SiteConfig {
  name: string;
  url: string;
  ogImage: string;
  description: string;
  links: {
    twitter: string;
    github: string;
    suggestions: string;
  };
  nav: NavItem[];
}

export const siteConfig = {
  name: 'AncientUI',
  url: 'https://ui.ancientstd.com',
  ogImage: 'https://ui.ancientstd.com/og.png',
  description: 'A Modern and Minimal React UI Library built with TailwindCSS.',
  links: {
    github: 'https://github.com/ancientstd/ancientui',
    ideas:
      'https://github.com/ancientstd/ancientui/discussions/categories/ideas',
  },
  nav: [
    {
      title: 'Components',
      href: 'https://ui.ancientstd.com',
      external: true,
    },
    {
      title: 'Icons',
      href: 'https://ui.ancientstd.com/icons',
      external: true,
    },
    {
      title: 'Docs',
      href: 'https://ui.ancientstd.com/docs',
      external: true,
    },
  ],
};
