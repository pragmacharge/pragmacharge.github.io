import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

import apiSidebar from './docs/api/sidebar';

const sidebars: SidebarsConfig = {
  // This is your single, primary sidebar for the entire site.
  tutorialSidebar: [
    'm2m-auth-guide',
    'filtering-and-sorting-guide',

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