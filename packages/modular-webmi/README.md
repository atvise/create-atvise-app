# @atvise/modular-webmi

> Modular exports for webmi.js: Re-exports parts of webmi.js with some API improvements (e.g. Promise support), written in TypeScript.
>
> **Please note that this currently work in progress.**

## Installation

Run `npm install --save-dev @atvise/modular-webmi` to install this package from npm.

_Currently it's also required that a working webmi.js is loaded in the browser._

## Usage

```ts
import { read } from '@atvise/modular-webmi';

read<number>('AGENT.OBJECTS.test')
  .then(({ value }) => console.log('Test, trippled:', value * 3))
  .catch((error) => console.error('Cannot read test', error));
```

<!-- BEGIN footer -->
<!-- This section is generated, do not edit it! -->

---

This package is part of the [create-atvise-app](https://github.com/LukasHechenberger/create-atvise-app#readme) project.

Refer to [it's documentation](https://github.com/LukasHechenberger/create-atvise-app#readme) for more information.

<!-- END footer -->
