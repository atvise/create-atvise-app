# create-atvise-app

Tools to integrate atvise in your modern web app project.

> **Note:** This project is currently under development.

## Overview

_create-atvise-app_ sets up a modern React development environment for your atvise project in no time. It's built upon facebook's [_create-react-app_](https://create-react-app.dev).

## Quickstart

With [node.js](https://nodejs.org/en/) (version 12 or newer), run _create-react-app_ to create a new project:

```bash
# Create the app with create-react-app
npx create-react-app --template @atvise/cra-template --scripts-version @atvise/react-scripts my-app
cd my-app
```

At this point you have a fully set up atvise/React project - let's test it!

First, you have to **start an atvise server** in the `atserver` directory. The easiest way to do so is via the atvise Project Console.

- Create a new project

  <center>
    <img alt="Start atvise server" style="max-width: 500px" src="./docs/assets/atmonitor-add-project.png" />
  </center>

- Select the `atserver` directory as it's path
- Click _OK_ to create it and
- Start atvise server via the ▶️-Button

  <center>
    <img alt="Start atvise server" style="max-width: 300px" src="./docs/assets/atmonitor-started.png" />
  </center>

<details>
<summary>You can also start atvise server from the command line</summary>

**On Windows**

```
"C:\Program Files\atvise\atserver.exe" /proj=%cd% atserver/nodes.db /boot
```

**On Linux**

```
atserver --proj $(pwd) --boot
```

</details>

Now we're ready to start the React development server:

```
npm start
```

This will open your browser and show a fully functional React app, displaying the value of an atvise variable:

<center>
  <img alt="React app" style="max-width: 500px" src="./docs/assets/react-app.png" />
</center>

## Development

This project makes very little assumptions on how you will develop your React app: You can use almost all UI libraries, routers, internationalization frameworks etc. that work with react.

Additionally, the [`@atvise/webmi-react`](./packages/webmi-react) package provides data bindings between your react app and atvise server. For example, you can use the `useSubscription` hook to display a variable's value:

```jsx
import { useSubscription } from '@atvise/webmi-react';

/**
 * @example
 * <MyLabel address="AGENT.OBJECTS.test" />
 */
function MyLabel(props) {
  const { loading, data, error } = useSubscription(props.address);

  if (loading) return <i>loading...</i>;
  if (error) return <i>An error ocurred</i>;

  return <p>AGENT.OBJECTS.test currently is: {data.value}</p>;
}
```

Check out the [`@atvise/webmi-react`](./packages/webmi-react) package for details.

## Deployment

You can deploy it to your atvise server by running `npm run deploy`. This command will create a new production build (by running `npm run build`) and upload it to your atvise server's project resources. Afterwards, you should see your react app when you open your atvise server in the browser (usually available at [localhost:8084](http://localhost:8084)).

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
| [@atvise/webmi-react](./packages/react)           | React bindings for webmi                                             |
| [@atvise/types-webmi](./packages/types-webmi)     | Type definitions for webmi.js                                        |

<!-- END packages -->
