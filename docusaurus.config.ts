import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'PragmaCharge API Docs',
  tagline: 'Official API Documentation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://pragmacharge.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'pragmacharge', // Your GitHub org/user name.
  projectName: 'pragmacharge.github.io', // Your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          routeBasePath: 'docs',
          docItemComponent: "@theme/ApiItem",
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api', // Must be unique among plugin instances
        docsPluginId: 'classic', // Corresponds to the preset-classic's docs plugin instance
        config: {
          api: { // A unique name for your API spec
            specPath: 'https://development.cloud.pragmacharge.com/api/v2/docs-json', // URL for runtime fetching
            outputDir: 'docs/api', // The directory for generated MDX files
            sidebarOptions: {
             groupPathsBy: "tag",
             categoryLinkSource: "tag",
            },
          },
        },
      },
    ],
  ],

  themes: ['docusaurus-theme-openapi-docs'],

  themeConfig: {
    image: '/img/pragmacharge.png',
    navbar: {
      title: 'PragmaCharge',
      logo: {
        alt: 'PragmaCharge Logo',
        src: '/img/pragmacharge.png',
      },
      items: [
        {
          to: '/docs/m2m-auth-guide',
          label: 'API Tutorials',
          position: 'left',
        },
        {
          to: '/docs/category/api-reference', // This links to the generated API category page
          label: 'API Reference',
          position: 'left',
        },
        {
          href: 'https://github.com/pragmacharge/pragmacharge.github.io', // Link to your project's GitHub
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // You can customize footer links here
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PragmaCharge. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
