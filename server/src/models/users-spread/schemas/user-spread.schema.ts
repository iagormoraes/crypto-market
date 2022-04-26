import * as mongoose from 'mongoose';

export const UserSpreadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  spreadPercentage: {
    type: Number,
    required: true,
    default: 2,
  },
});
