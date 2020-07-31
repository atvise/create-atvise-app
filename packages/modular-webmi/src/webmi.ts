/// <reference types="@atvise/types-webmi" />

export function getWebMI() {
  if (!window.webMI) {
    throw new Error(`No webmi detected. Is your atvise server running?`);
  }

  return window.webMI;
}
