import React, { useCallback, useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import Editor from '../utils/Editor';
import type { ReplFile } from '.';

type Props = {
  files: ReplFile[];
  onChange: (files: ReplFile[]) => void;
};

export default function ReplInput({ files, onChange }: Props) {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const selectedFile = files[selectedFileIndex];

  const updateFile = useCallback(
    (contents: string) => {
      onChange(files.map((f, i) => (i === selectedFileIndex ? { ...f, contents } : f)));
    },
    [files, selectedFileIndex, onChange]
  );

  return (
    <>
      <Tabs value={selectedFileIndex} onChange={(_, value) => setSelectedFileIndex(value)}>
        {files.map((file) => (
          <Tab key={file.name} label={file.name} />
        ))}
      </Tabs>

      <Editor mode="jsx" value={selectedFile.contents} onChange={updateFile} />
    </>
  );
}
