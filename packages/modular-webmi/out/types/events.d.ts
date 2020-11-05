export declare type EventHandler<E> = (e: E) => void;
/**
 * Registers an event handler. Can be used with DOM elements as well as with webMI internal modules
 * (such as webMI.data).
 * @param target The event target.
 * @param name The event to handle.
 * @param handler The event handler.
 */
export declare function addEvent<E>(target: any, name: string, handler: EventHandler<E>): () => void;
