const responseCache = new Map<string, Promise<Response>>();
const cache = new Map<string, Promise<any>>();

type ResponseHandler<T> = (response: Response) => T | Promise<T>;

const checkFetchResponse = (response: Response) => {
  if (!response.ok)
    throw Object.assign(new Error(response.statusText || `Status ${response.status}`), {
      url: response.url,
    });

  return response;
};

export function fetchCachedResponse(url: string) {
  if (responseCache.has(url)) {
    return responseCache.get(url)!;
  }

  const promise = fetch(url, { redirect: 'follow', method: 'HEAD' })
    .then(checkFetchResponse)
    .catch((error) => {
      responseCache.delete(url);
      throw error;
    });
  responseCache.set(url, promise);

  return promise;
}

export function fetchCached<T>(path: string, handleResponse: ResponseHandler<T>) {
  if (cache.has(path)) {
    return cache.get(path)! as Promise<T>;
  }

  const operation = fetch(path, { redirect: 'follow' })
    .then(checkFetchResponse)
    .then(handleResponse)
    .catch((error) => {
      cache.delete(path);
      throw error;
    });
  cache.set(path, operation);

  return operation;
}
