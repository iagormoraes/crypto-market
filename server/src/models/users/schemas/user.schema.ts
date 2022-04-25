import * as mongoose from 'mongoose';

import { Role } from '../../roles/role.enum';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    enum: Role,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
