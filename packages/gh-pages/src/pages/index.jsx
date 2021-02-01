import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Faster Development',
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Use React and it&apos;s developer tools with live reloading to instantly see your changes,
        while still using Variables and Scripts on your atvise server.
      </>
    ),
  },
  {
    title: 'Easy updates',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: <>Your app only needs one build dependency.</>,
  },
  {
    title: 'No Lock-In',
    imageUrl: 'img/undraw_docusaurus_mountain.svg',

    description: (
      <>
        Under the hood, we use a fork of <i>create-react-app</i> which is based on webpack, Babel,
        ESLint and other tools. If you ever want to change that, you can &ldquo;eject&rdquo; and
        edit the config files directly.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description={siteConfig.tagline}
    >
      <header className={clsx('hero hero--dark', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--primary button--lg', styles.getStarted)}
              to={useBaseUrl('docs/')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
