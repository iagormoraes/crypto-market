import { Mongoose } from 'mongoose';

import { UserSpreadSchema } from './schemas/user-spread.schema';

export const usersSpreadProvider = [
  {
    provide: 'USER_SPREAD_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('UserSpread', UserSpreadSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
