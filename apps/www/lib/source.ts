import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import * as icons from 'ancient-icons';
import { createElement } from 'react';

import { docs, meta } from '@/.source';

export const source = loader({
  baseUrl: '/docs',
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
  source: createMDXSource(docs, meta),
});
