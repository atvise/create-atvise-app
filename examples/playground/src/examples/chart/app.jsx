import React, { useState, useEffect } from 'react';
import { useSubscription } from '@atvise/webmi-react';
import { VictoryChart , VictoryTheme, VictoryLine } from 'victory';

/** A hook that collects values of the given variable */
function useCollectedSamples(address) {
  const [samples, setSamples] = useState([]);
  const { loading, data, error } = useSubscription(address);

  useEffect(() => {
    if (data && (!samples.length || data.value !== samples[samples.length - 1].y)) {
      setSamples([...samples, { x: new Date(data.timestamp), y: data.value }]);
    }
  }, [data, samples]);

  return { loading, data: samples, error };
}

function Chart() {
  const double1 = useCollectedSamples('AGENT.OBJECTS.SimulatedData.double_1');
  const double2 = useCollectedSamples('AGENT.OBJECTS.SimulatedData.double_2');

  if (double1.error || double2.error) return <i>An error ocurred: {error.message}</i>;
  if (double1.data.length < 2 || double2.data.length < 2) return <i>loading...</i>;

  return (
    <VictoryChart theme={VictoryTheme.material} animate={{ duration: 200, easing: 'quadInOut' }}>
      <VictoryLine data={double1.data} />
      <VictoryLine data={double2.data} />
    </VictoryChart>
  );
}

export default function App() {
  return <Chart />;
}
