# create-atvise-app

Tools to integrate atvise in your modern web app project.

> **Note:** This project is currently under development.

## Quick Overview

_create-atvise-app_ sets up a modern development environment for your atvise web app in no time. It's inspired by [_create-react-app_](https://create-react-app.dev).

```bash
npx create-atvise-app my-app
cd my-app
npm start
```

This will start a React app locally and open it the browser.

You can deploy it to your atvise server by running `npm run deploy`.

## What's included?

Currently, we only support **React apps**, but we're planning to add support for Vue and Angular in the future.

<!-- FIXME: Create and link docs on how to use *atvise-scripts* with non-react apps -->

## Packages

The whole project is split into different packages:

<!-- BEGIN packages -->
<!-- This section is generated, do not edit it! -->

| Name                                              | Description                                                          |
| :------------------------------------------------ | :------------------------------------------------------------------- |
| [atvise-scripts](./packages/atvise-scripts)       | The scripts used by create-atvise-app to interact with atvise server |
| [@atvise/modular-webmi](./packages/modular-webmi) | Modular exports for webmi.js                                         |
| [@atvise/types-webmi](./packages/types-webmi)     | Type definitions for webmi.js                                        |

<!-- END packages -->
