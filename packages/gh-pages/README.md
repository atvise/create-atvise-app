# Website

> Sources of our docs

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

## Installation

```console
pnpm install
```

## Local Development

```console
npm start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

> Note: The docs are automatically updated by CircleCI whenever we push to master.

```console
GIT_USER=<Your GitHub username> USE_SSH=true npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

<!-- BEGIN footer -->
<!-- This section is generated, do not edit it! -->

---

This package is part of the [create-atvise-app](https://github.com/atvise/create-atvise-app#readme) project.

Refer to [it's documentation](https://github.com/atvise/create-atvise-app#readme) for more information.

<!-- END footer -->
