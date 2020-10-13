import React from 'react';
import { useSubscription } from '@atvise/webmi-react';

function MyLabel(props) {
  const { loading, data, error } = useSubscription(props.address);

  if (loading) return <i>loading...</i>;
  if (error) return <i>An error ocurred: {error.message}</i>;

  return <span>AGENT.OBJECTS.test currently is: {data.value.toFixed(2)}</span>;
}

export default function App() {
  return (
    <p>
      <MyLabel address="AGENT.OBJECTS.SimulatedData.double_1" />
    </p>
  );
}
