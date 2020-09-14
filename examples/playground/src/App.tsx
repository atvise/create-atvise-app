import React from 'react';
import { useSubscription } from '@atvise/webmi-react';
// import logo from './logo.svg';
import './App.css';

function App() {
  const { data } = useSubscription<number>('AGENT.OBJECTS.test');

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <hr />
        <p>
          <code>AGENT.OBJECTS.test</code> is currently:{' '}
          <strong>{data?.value.toFixed(2) ?? ''}</strong>
        </p>
      </header>
    </div>
  );
}

export default App;
