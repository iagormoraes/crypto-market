import { HttpClient } from './http-client';

const url =
  typeof window === 'undefined'
    ? 'http://crypto-market-node:3001'
    : 'http://localhost:3001';

export const httpClientExternal = new HttpClient(url);
