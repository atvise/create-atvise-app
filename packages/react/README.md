# @atvise/webmi-react

> React bindings for webmi

## Installation

### create-atvise-app (recommended)

Run `npx create-atvise-app my-app` to create a new react app with webmi all set up.

### Manual installation

These are the steps required to add webmi bindings to your existing react project:

- First install this package and `atvise-scripts` with npm:

  `npm install --save-dev @atvise/webmi-react atvise-scripts`

- Setup `atvise-scripts` with `npx atvise-scripts init`

## Usage

_@atvise/webmi-react_ exports hooks that can be used in functional React components:

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

### Available hooks

- [x] `useValue(address)` - A hooks that reads a variable one time |
- [x] `useSubscription(address)` - A hooks that subscribes to a variable |

**Upcoming**

- [ ] `useClientVariables()` - Returns logged in user, selected language, ...
- [ ] `useFilterSubscription()` - Subscription hook with filters (using _webMI.data.subscribeFilters_)
- [ ] `useAlarms` - A hook that returns alarms, so it can be used for an alarm list / table

<!-- BEGIN footer -->
<!-- This section is generated, do not edit it! -->

---

This package is part of the [create-atvise-app](https://github.com/atvise/create-atvise-app#readme) project.

Refer to [it's documentation](https://github.com/atvise/create-atvise-app#readme) for more information.

<!-- END footer -->
