import * as mongoose from 'mongoose';

import { RoleEnumValue } from '../../roles/role.enum';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: Object.values(RoleEnumValue),
    required: true,
    default: RoleEnumValue.User,
  },
  password: {
    type: String,
    required: true,
  },
});
