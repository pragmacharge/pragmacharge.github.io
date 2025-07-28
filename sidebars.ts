import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

import apiSidebar from './docs/api/sidebar';

const sidebars: SidebarsConfig = {
  // This is your single, primary sidebar for the entire site.
  tutorialSidebar: [
    {
      type: 'category',
      label: 'API Tutorials',
      items: [
        'm2m-auth-guide',
        'pagination',
        'including-nested-fields',
        'filtering-and-sorting-guide',
      ],
    },
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
