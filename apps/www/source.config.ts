import { remarkHeading, remarkImage } from 'fumadocs-core/mdx-plugins';
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
  dir: 'content',
  docs: {
    async: false,
    schema: frontmatterSchema.extend({
      title: z.string(),
      description: z.string(),
    }),
  },
});

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    rehypeCodeOptions: {
      inline: 'tailing-curly-colon',
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      langs: ['ts', 'tsx', 'js', 'jsx', 'json', 'css', 'html', 'md', 'mdx'],
      defaultLanguage: 'tsx',
    },
    remarkPlugins: [[remarkHeading, { generateToc: true }], remarkImage],
  },
});
