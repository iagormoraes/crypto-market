import create from 'zustand';
import { persist } from 'zustand/middleware';

import { getStorage } from '../store.util';

import { CryptoAsset } from '../../modules/crypto/interfaces/asset.interface';

interface CryptoState {
  cryptoHistory: CryptoAsset[];
  add(item: CryptoAsset): void;
}

export const useStore = create<CryptoState>()(
  persist(
    (set) => ({
      cryptoHistory: [],
      add: (item: CryptoAsset) =>
        set((state) => ({
          cryptoHistory: [item, ...state.cryptoHistory].slice(0, 100),
        })),
    }),
    {
      name: 'crypto.history',
      getStorage: getStorage,
    },
  ),
);
