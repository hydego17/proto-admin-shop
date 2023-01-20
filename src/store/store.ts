import { useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface GlobalStore {
  totalCarts: number;
}

/**
 * App global store with persistence (saved to localStorage)
 *
 * @see {@link https://jotai.org/docs/utils/atom-with-storage}
 */
export const globalStore = atomWithStorage<GlobalStore>('store', {
  totalCarts: 0,
});

/**
 * Hooks to access global store
 */
export const useGlobalStore = () => {
  const store = useAtomValue(globalStore);
  const update = useSetAtom(globalStore);

  const updateStore = useCallback(
    <K extends keyof GlobalStore>(key: K, callback: ((prev: GlobalStore[K]) => GlobalStore[K]) | GlobalStore[K]) => {
      if (typeof callback === 'function') {
        return update((prev) => ({
          ...prev,
          [key]: callback(prev[key]),
        }));
      }

      return update((prev) => ({
        ...prev,
        [key]: callback,
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { store, updateStore };
};
