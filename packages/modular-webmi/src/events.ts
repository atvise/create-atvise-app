export type EventHandler<E> = (e: E) => void;

/**
 * Registers an event handler. Can be used with DOM elements as well as with webMI internal modules
 * (such as webMI.data).
 * @param target The event target.
 * @param name The event to handle.
 * @param handler The event handler.
 */
export function addEvent<E>(target: any, name: string, handler: EventHandler<E>) {
  let active = true;

  webMI.addEvent(target, name, (e) => {
    if (!active) return;
    handler(e);
  });

  // NOTE: webMI.removeEvent is not implemented for all events 🙄
  // We call it with the same signature as addEvent, but don't rely on it to work.
  return () => {
    active = false;
    (webMI.removeEvent as typeof webMI.addEvent)(target, name, handler);
  };
}
