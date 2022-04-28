const dummyStorageApi = {
  getItem: () => null,
  setItem: () => undefined,
};

export const getStorage = () =>
  (typeof window !== 'undefined'
    ? window.localStorage
    : dummyStorageApi) as Storage;
