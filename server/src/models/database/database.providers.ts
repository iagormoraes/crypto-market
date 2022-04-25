import * as mongoose from 'mongoose';

import { Environment } from '../../config/environment';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        'mongodb://crypto-market-db/' + Environment.DATABASE_NAME,
      ),
  },
];
