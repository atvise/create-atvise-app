interface UseCallOptions<A, R, D> {
    defaults?: D;
    onCompleted?: (data: R) => void;
    onError?: (error: Error) => void;
}
interface UseCallState<R> {
    called: boolean;
    loading: boolean;
    data?: R;
    error?: Error;
}
declare type UseCallCallback<A, R, D> = (args: Omit<A, keyof D> & Partial<D>) => Promise<void>;
/**
 * A hook to call a webMI method script.
 * @param name The method script to call.
 * @param options The options to use.
 */
export default function useCall<A extends Record<string, string>, R = void, D extends Partial<A> = Partial<A>>(name: string, { defaults, onCompleted, onError }?: UseCallOptions<A, R, D>): [UseCallCallback<A, R, D>, UseCallState<R>];
export {};
