# @atvise/types-webmi

> Type definitions for webmi.js
>
> **Please note that these definitions are currently work in progress.**

## Installation

Run `npm install --save-dev @atvise/types-webmi` to install this package from npm.

## Usage

In your script, that has access to `window.webMI` add a [Tripple-Slash-Directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html).

```ts
/// <reference types="@atvise/types-webmi" />

// At this point, TypeScript will know the `webMI` global and it's type.

// Fails, because `isPaused()` returns a boolean
const test = webMI.data.isPaused() + 3;
```

<!-- BEGIN footer -->
<!-- This section is generated, do not edit it! -->

---

This package is part of the [create-atvise-app](https://github.com/atvise/create-atvise-app#readme) project.

Refer to [it's documentation](https://github.com/atvise/create-atvise-app#readme) for more information.

<!-- END footer -->
