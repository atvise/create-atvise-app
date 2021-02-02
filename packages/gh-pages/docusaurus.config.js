const gh = require('github-url-to-object');
const pkg = require('./package.json');

const repo = gh(pkg.repository.url);

const title = 'create-atvise-app';
const projectDescription = 'Tools to integrate atvise into your modern web app project';

module.exports = {
  title,
  tagline: projectDescription,
  url: `https://${repo.user.toLowerCase()}.github.io`,
  baseUrl: `/${repo.repo}/`,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: repo.user,
  projectName: repo.repo,
  themeConfig: {
    respectPrefersColorScheme: true,
    navbar: {
      title,
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: repo.https_url,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: repo.https_url,
            },
          ],
        },
        {
          title: 'Related',
          items: [
            {
              label: 'atscm',
              href: 'https://atscm.github.io',
            },
            {
              label: 'atvise',
              href: 'https://atvise.com',
            },
            {
              label: '@atvise/create-react-app',
              href: 'https://github.com/LukasHechenberger/create-react-app',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Bachmann Visutec GmbH. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: `${repo.https_url}/edit/master/packages/gh-pages/`,
        },
        blog: {
          showReadingTime: true,
          editUrl: `${repo.https_url}/edit/master/packages/gh-pages/`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
