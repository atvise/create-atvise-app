import React, { useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import ReplPreview from './output/Preview';
import type { BundlerResult } from '../../bundler/Bundler';

type Props = {
  bundle?: BundlerResult;
};

export default function ReplOutput({ bundle }: Props) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <Tabs value={selectedTab} onChange={(_, value) => setSelectedTab(value)}>
        <Tab label="Preview" />
      </Tabs>

      <ReplPreview bundle={bundle} />
    </>
  );
}
