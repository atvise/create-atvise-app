export type EventHandler<E> = (e: E) => void;

/**
 * Registers an event handler. Can be used with DOM elements as well as with webMI internal modules
 * (such as webMI.data).
 */
export function addEvent<E>(target: any, name: string, handler: EventHandler<E>) {
  let active = true;

  webMI.addEvent(target, name, (e) => {
    if (!active) return;
    handler(e);
  });

  // NOTE: webMI.removeEvent is not implemented for all events 🙄
  return () => {
    active = false;
    // @ts-ignore
    webMI.removeEvent(target, name, handler);
  };
}
