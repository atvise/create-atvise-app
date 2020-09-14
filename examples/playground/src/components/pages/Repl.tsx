import React from 'react';
import { SplitPane } from 'react-collapse-pane';

export default function Repl() {
  return (
    <SplitPane split="vertical">
      <div>Input</div>
      <div>Output</div>
    </SplitPane>
  );
}
