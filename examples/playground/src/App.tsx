import React from 'react';
import { useSubscription } from '@atvise/webmi-react';

function App() {
  const { data } = useSubscription<number>('AGENT.OBJECTS.test');

  return (
    <p>
      <code>AGENT.OBJECTS.test</code> is currently: <strong>{data?.value.toFixed(2) ?? ''}</strong>
    </p>
  );
}

export default App;
