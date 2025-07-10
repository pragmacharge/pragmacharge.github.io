import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

import apiSidebar from './docs/api/sidebar';

const sidebars: SidebarsConfig = {
  // This is your single, primary sidebar for the entire site.
  tutorialSidebar: [
    'intro', // Links to your docs/intro.md

    {
      type: 'category',
      label: 'API Reference',
      link: {
        type: 'generated-index',
        slug: '/category/api-reference'
      },
      items: apiSidebar,
    },
  ],
};

export default sidebars;