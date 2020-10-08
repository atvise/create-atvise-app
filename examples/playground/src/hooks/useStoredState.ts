import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type Options<T> = {
  storage?: Storage;
  key: string;
  defaultValue: T;
};

export default function useStoredState<T>({
  storage = localStorage,
  key,
  defaultValue,
}: Options<T>) {
  const [state, setState] = useState<T>(() => {
    const stored = storage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  function setStoredState(updatedState: T) {
    storage.setItem(key, JSON.stringify(updatedState));
    setState(updatedState);
  }

  return [state, setStoredState] as [T, (state: T) => void];
}
